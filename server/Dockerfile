# Dockerfile for Express API server
FROM node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY tsconfig.json ./tsconfig.json
COPY .env ./.env
COPY . /app
CMD ["node", "index.js"]
