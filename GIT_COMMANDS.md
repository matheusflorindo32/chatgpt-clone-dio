# 🚀 COMANDOS FINAIS — Git & GitHub

Siga estes comandos para subir seu projeto no GitHub.

---

## 1. Inicializar o repositório Git

```bash
cd chatgpt-clone-dio
git init
```

## 2. Adicionar todos os arquivos

```bash
git add .
```

## 3. Fazer o primeiro commit

```bash
git commit -m "feat: initial commit - ChatGPT Clone DIO full stack project

- Add Node.js/Express backend with OpenAI integration
- Add React frontend with modern UI
- Add environment configuration template
- Add professional README with setup instructions"
```

## 4. Criar repositório no GitHub

1. Acesse: https://github.com/new
2. Nome do repositório: `chatgpt-clone-dio`
3. Descrição: "Clone do ChatGPT com Node.js, React e OpenAI API - Desafio DIO"
4. Deixe como **Público**
5. **NÃO** marque para inicializar com README (já temos um)
6. Clique em **Create repository**

## 5. Conectar ao repositório remoto

```bash
git remote add origin https://github.com/Cateano93/chatgpt-clone-dio.git
```

> Substitua `Cateano93` pelo seu usuário do GitHub.

## 6. Enviar para o GitHub

```bash
git branch -M main
git push -u origin main
```

## 7. Verificar se subiu corretamente

Acesse: `https://github.com/Cateano93/chatgpt-clone-dio`

---

## 📤 Comandos para atualizações futuras

```bash
# Após fazer alterações
git add .
git commit -m "descrição das alterações"
git push
```

---

## 🔗 Link para entrega na DIO

Copie este link e cole na plataforma da DIO:

```
https://github.com/Cateano93/chatgpt-clone-dio
```

---

## ⚠️ IMPORTANTE: Nunca commite o .env!

Antes de enviar, verifique que o arquivo `.env` NÃO será enviado:

```bash
git status
```

Se aparecer `.env` na lista, algo está errado. Verifique o `.gitignore`.

---

## 🎉 Sucesso!

Seu projeto está no GitHub e pronto para avaliação. 🚀
