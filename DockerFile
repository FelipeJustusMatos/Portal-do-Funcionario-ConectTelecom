# Utiliza a imagem base do Node.js 18 com Alpine 3.16
# Use the Node.js 18 Alpine 3.16 base image
FROM node:18-alpine3.16

# Cria um diretório para sua aplicação
# Create a directory for your application
RUN mkdir -p /usr/src/portalfuncionario

# Define o diretório de trabalho para o diretório da aplicação
# Set the working directory to your application directory
WORKDIR /usr/src/portalfuncionario

# Cache para npm install
# Cache for npm install
COPY package.json .
COPY package-lock.json .

# Atualiza o npm para a versão mais recente
# Update npm to the latest version
RUN npm install -g npm@latest

# Instala as dependências da aplicação
# Install the dependencies for your application
RUN npm install -f --quiet --no-optional --no-fund --loglevel=error

# # Copia o arquivo .env.production para o diretório de trabalho e renomeia para .env
# # Copy the .env.production file to the working directory and rename it to .env
# COPY ./.env.production .env

# Copia o código e os arquivos da aplicação para o diretório de trabalho
# Copy the application code and files to the working directory
COPY . .

# Compila a aplicação
# Build the application
RUN npm run build

# Expõe a porta 3001 para acesso externo
# Expose port 3001 to the outside world
EXPOSE 3001

CMD ["npm", "run", "start"]
