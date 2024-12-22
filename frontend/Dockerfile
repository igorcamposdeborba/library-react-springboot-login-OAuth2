FROM node:16-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código fonte
COPY . .

# Rodar o build do React
RUN npm run build

# Expor a porta 3000 para o React
EXPOSE 3000

# Iniciar o servidor React
CMD ["npm", "start"]