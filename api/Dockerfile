FROM node:14.21.3-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

# npm build:assets (invoked by build) expects src/client to exist, so create it.
RUN mkdir -p src/client
RUN npm run build

EXPOSE 9000

CMD ["node", "./build/server.js"]