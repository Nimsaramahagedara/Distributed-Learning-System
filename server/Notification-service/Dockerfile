FROM node:20

WORKDIR /src

COPY pacage*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "node","server.js" ]