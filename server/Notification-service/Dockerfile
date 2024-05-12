FROM node:20

WORKDIR /src

COPY pacage*.json ./

RUN npm install

COPY . .

EXPOSE 5003

CMD [ "node","server.js" ]