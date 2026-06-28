# Dockerfile para o backend Node.js
FROM node:18-alpine

WORKDIR /app

# Copia package.json primeiro (cache de camadas)
COPY server/package.json ./
RUN npm install

# Copia o resto do código
COPY server/ .

EXPOSE 5000

CMD ["node", "server.js"]
