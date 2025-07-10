# Stage 1: Build the Vue app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy build output from the builder stage to the Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: Copy custom Nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]