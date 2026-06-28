# 📋 CHECKLIST DE ENTREGA DIO — ChatGPT Clone

Use esta lista para verificar se tudo está pronto antes de enviar.

## ✅ Estrutura do Projeto

- [ ] Pasta `server/` com backend Node.js/Express
- [ ] Pasta `web/` com frontend React
- [ ] Arquivo `README.md` na raiz
- [ ] Arquivo `.gitignore` na raiz
- [ ] Arquivo `server/.env.example` (SEM chave real)

## ✅ Backend (server/)

- [ ] `package.json` com dependências: express, cors, dotenv, openai
- [ ] `server.js` criando servidor Express na porta 5000
- [ ] Rota `POST /api/chat` recebendo mensagem e retornando resposta
- [ ] CORS habilitado
- [ ] Variável de ambiente `OPENAI_API_KEY` usada (não hardcoded)
- [ ] Tratamento de erros implementado
- [ ] Mensagens de erro amigáveis
- [ ] Rota de health check (`GET /health`)

## ✅ Frontend (web/)

- [ ] `package.json` com dependências: react, react-dom, vite, axios
- [ ] Interface de chat funcional
- [ ] Campo de input para digitar mensagem
- [ ] Botão de enviar
- [ ] Área de exibição da conversa
- [ ] Diferenciação visual entre mensagem do usuário e da IA
- [ ] Estado de carregamento ("Gerando resposta...")
- [ ] Tratamento de erro se backend não responder
- [ ] Layout responsivo (funciona em mobile)

## ✅ Segurança

- [ ] **NUNCA** expôs a chave da OpenAI no frontend
- [ ] **NUNCA** deixou a chave no código (usou .env)
- [ ] `.env` está no `.gitignore`
- [ ] `.env.example` existe como template

## ✅ README

- [ ] Título do projeto
- [ ] Descrição do desafio
- [ ] Tecnologias utilizadas
- [ ] Funcionalidades
- [ ] Estrutura de pastas
- [ ] Como clonar
- [ ] Como configurar backend
- [ ] Como configurar frontend
- [ ] Como criar o .env
- [ ] Como rodar o projeto
- [ ] Créditos ao projeto base
- [ ] Autor

## ✅ GitHub

- [ ] Repositório criado no GitHub
- [ ] Commits organizados e descritivos
- [ ] Repositório público (para avaliação)
- [ ] URL do repositório copiada para entrega na DIO

## ✅ Testes Manuais

- [ ] `npm install` funciona na pasta server
- [ ] `npm start` inicia o backend na porta 5000
- [ ] `npm install` funciona na pasta web
- [ ] `npm run dev` inicia o frontend na porta 5173
- [ ] Consegue digitar uma mensagem e receber resposta da IA
- [ ] Erros são tratados amigavelmente
- [ ] Layout fica bom no celular (teste no DevTools)

## 🚀 Pronto para Entregar!

Se marcou todos os itens acima, pode enviar o link do repositório na plataforma da DIO.

**Boa sorte! 🍀**
