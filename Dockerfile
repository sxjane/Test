FROM node:current-slim
#ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
COPY . .
EXPOSE 8080
RUN npm install && npm run build

CMD ["node", "./server/server.js"]