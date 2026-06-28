require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * RATE LIMITING SIMPLEs - Protege contra abuso da API
 * Limita a 5 requisições por minuto por IP
 */
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minuto
const RATE_LIMIT_MAX = 5; // 5 requisições por janela

const rateLimitMiddleware = (req, res, next) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || 'unknown';
  const now = Date.now();
  
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, start: now });
    return next();
  }
  
  const data = rateLimit.get(ip);
  
  // Reseta o contador se a janela de tempo passou
  if (now - data.start > RATE_LIMIT_WINDOW) {
    data.count = 1;
    data.start = now;
    return next();
  }
  
  // Verifica se excedeu o limite
  if (data.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((data.start + RATE_LIMIT_WINDOW - now) / 1000);
    return res.status(429).json({
      error: 'Muitas requisições',
      details: `Limite de ${RATE_LIMIT_MAX} requisições por minuto atingido. Aguarde ${retryAfter}s.`,
      retryAfter,
    });
  }
  
  data.count++;
  next();
};

// Limpa entradas antigas do rate limit a cada 10 minutos
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimit.entries()) {
    if (now - data.start > RATE_LIMIT_WINDOW) {
      rateLimit.delete(ip);
    }
  }
}, 600000);

// Adiciona healthcheck simples para Railway
app.get('/', (req, res) => {
  res.json({ status: 'ChatGPT Clone API is running', timestamp: new Date().toISOString() });
});

/**
 * Inicializa o cliente OpenAI com a chave da API
 * A chave NUNCA é exposta no frontend - fica apenas no servidor
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middlewares - CORS configurado para permitir frontend no Vercel/Railway
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json()); // Parseia JSON no body das requisições

/**
 * ROTA PRINCIPAL: POST /api/chat
 * Recebe mensagem do usuário e retorna resposta da IA
 * Protegida por rate limiting (5 req/min por IP)
 */
app.post('/api/chat', rateLimitMiddleware, async (req, res) => {
  try {
    const { message } = req.body;

    // Validação: mensagem é obrigatória
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({
        error: 'Mensagem inválida',
        details: 'O campo "message" é obrigatório e não pode estar vazio.',
      });
    }

    // Verifica se a API key está configurada
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'Configuração incompleta',
        details: 'A variável OPENAI_API_KEY não está definida no arquivo .env',
      });
    }

    // Chama a API da OpenAI
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um assistente útil e amigável. Responda de forma clara e objetiva.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Extrai a resposta da IA
    const reply = completion.choices[0]?.message?.content || 'Sem resposta';

    // Retorna sucesso
    res.json({
      success: true,
      reply,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Erro na API OpenAI:', error.message);

    // Tratamento de erros específicos da OpenAI
    if (error.status === 401) {
      return res.status(401).json({
        error: 'Chave de API inválida',
        details: 'Verifique sua OPENAI_API_KEY no arquivo .env',
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: 'Limite de requisições excedido',
        details: 'Muitas requisições. Aguarde um momento e tente novamente.',
      });
    }

    if (error.status >= 500) {
      return res.status(502).json({
        error: 'Erro na API da OpenAI',
        details: 'O serviço da OpenAI está temporariamente indisponível. Tente novamente.',
      });
    }

    // Erro genérico
    res.status(500).json({
      error: 'Erro interno do servidor',
      details: 'Ocorreu um erro ao processar sua mensagem. Tente novamente.',
    });
  }
});

/**
 * ROTA DE SAÚDE: GET /health
 * Verifica se o servidor está funcionando
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'ChatGPT Clone API',
    version: '1.0.0',
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📡 Rota da API: http://localhost:${PORT}/api/chat`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
});
