FROM node:18.14.1-alpine3.16

WORKDIR /usr/gate

RUN apk update && apk add curl

COPY package.json .

RUN npm install -g npm@latest
RUN npm install gulp

COPY gulpfile.js .
COPY daemon.js .
COPY app.js .

ENV IP 192.168.1.15

CMD npm start