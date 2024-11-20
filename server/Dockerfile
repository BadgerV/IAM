FROM node:21 AS base

WORKDIR /app/server

COPY package*.json ./

RUN npm install && npm install typescript -g

COPY . .

EXPOSE 8000

CMD ["npm", "run", "start"]