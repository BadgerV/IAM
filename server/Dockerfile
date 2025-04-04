FROM node:21 AS base

WORKDIR /app/server

COPY package*.json ./
RUN npm install

COPY . . 

# COPY access-shield-jagah-firebase.json ./dist/access-shield-jagah-firebase.json

EXPOSE 8000
CMD ["npm", "run", "start"]