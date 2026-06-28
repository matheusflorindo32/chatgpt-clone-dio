# 🚀 GUIA DE DEPLOY COMPLETO

Deploy do ChatGPT Clone em produção com Railway (backend) + Vercel (frontend).

---

## 📋 PRÉ-REQUISITOS

- Conta no [Railway](https://railway.app)
- Conta no [Vercel](https://vercel.com)
- Conta na [OpenAI](https://platform.openai.com) com créditos
- Repositório no GitHub: `matheusflorindo32/chatgpt-clone-dio`

---

## 1️⃣ DEPLOY DO BACKEND (Railway)

### Passo 1: Criar projeto no Railway

1. Acesse https://railway.app/new
2. Selecione **"Deploy from GitHub repo"**
3. Escolha `matheusflorindo32/chatgpt-clone-dio`
4. Clique em **"Add variables"**

### Passo 2: Configurar variáveis de ambiente

Adicione estas variáveis no Railway:

```env
OPENAI_API_KEY=sk-sua_chave_api_aqui
OPENAI_MODEL=gpt-3.5-turbo
PORT=5000
FRONTEND_URL=https://chatgpt-clone-dio.vercel.app
```

> ⚠️ **Substitua** `sk-sua_chave_api_aqui` pela sua chave real da OpenAI.

### Passo 3: Deploy automático

O Railway detecta o `Dockerfile` e faz o deploy automaticamente.

Aguarde o build completar (2-3 minutos).

### Passo 4: Obter URL do backend

O Railway vai gerar uma URL pública tipo:

```
https://chatgpt-clone-dio-production.up.railway.app
```

**Copie essa URL**, você vai precisar dela para o frontend.

---

## 2️⃣ DEPLOY DO FRONTEND (Vercel)

### Passo 1: Criar projeto no Vercel

1. Acesse https://vercel.com/new
2. Importe seu repositório GitHub
3. Selecione `matheusflorindo32/chatgpt-clone-dio`

### Passo 2: Configurar build settings

No Vercel, configure:

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `web` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### Passo 3: Adicionar variável de ambiente

Adicione no Vercel (Settings → Environment Variables):

```env
VITE_API_URL=https://chatgpt-clone-dio-production.up.railway.app
```

> ⚠️ **Use a URL do Railway** que você copiou no passo anterior!

### Passo 4: Deploy

Clique em **Deploy** e aguarde (1-2 minutos).

O Vercel vai gerar uma URL tipo:

```
https://chatgpt-clone-dio.vercel.app
```

---

## 3️⃣ CONFIGURAR CORS (IMPORTANTE!)

Depois de ter a URL do Vercel, volte no Railway e atualize:

```env
FRONTEND_URL=https://chatgpt-clone-dio.vercel.app
```

Isso permite que o frontend acesse o backend sem bloqueios de CORS.

---

## ✅ VERIFICAÇÃO FINAL

Acesse seu frontend no Vercel e teste:

1. Digite uma mensagem
2. Clique em enviar
3. Deve aparecer a resposta da IA

Se der erro de CORS, verifique se `FRONTEND_URL` está configurado corretamente no Railway.

---

## 🔄 ATUALIZAÇÕES FUTURAS

Sempre que fizer push pro GitHub:

```bash
git add .
git commit -m "sua mensagem"
git push
```

O Railway e Vercel fazem deploy automático!

---

## ❌ SOLUÇÃO DE PROBLEMAS

### Erro: "Conection refused"
- Verifique se o backend está rodando no Railway
- Verifique se `VITE_API_URL` está correta no Vercel

### Erro: "CORS policy"
- Verifique `FRONTEND_URL` no Railway
- Adicione a URL exata do Vercel (com https://)

### Erro: "Invalid API Key"
- Verifique `OPENAI_API_KEY` no Railway
- Certifique-se que a chave é válida e tem créditos

---

**Pronto! Seu ChatGPT Clone está no ar! 🚀**
