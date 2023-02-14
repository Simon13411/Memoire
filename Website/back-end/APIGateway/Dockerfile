FROM node:11.0.0-alpine

WORKDIR /usr/dbops

RUN apk update && apk add curl

COPY package.json .

RUN npm install

COPY gulpfile.js .
COPY daemon.js .
COPY app.js .

ENV IP localhost

CMD npm start