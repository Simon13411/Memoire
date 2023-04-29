FROM node:18.14.1-alpine3.16

WORKDIR /usr/dlder

RUN apk update && apk add curl

COPY package.json .

RUN npm install -g npm@latest
RUN npm install gulp

COPY gulpfile.js .
COPY daemon.js .
COPY app.js .
RUN mkdir -p /usr/dlder/Files
COPY Files/ Files/.

ENV IP localhost

CMD npm start