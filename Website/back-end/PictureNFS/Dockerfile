FROM node:18.14.1-alpine3.16

WORKDIR /usr/picturenfs

RUN apk update && apk add curl

COPY package.json .

RUN npm install -g npm@latest
RUN npm install gulp

COPY gulpfile.js .
COPY daemon.js .
COPY app.js .
RUN mkdir -p /usr/picturenfs/share

ENV IP localhost

CMD npm start