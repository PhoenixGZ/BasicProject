# Dockerfile for Express API server
# FROM node
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY tsconfig.json ./tsconfig.json
# COPY .env ./.env
# COPY . /app
# CMD ["node", "index.js"]

FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the TypeScript code
RUN npm run build

# Run the compiled JS
CMD ["node", "dist/index.js"]