FROM node:18.14.1-alpine3.16

WORKDIR /usr/login

RUN apk update && apk add curl

COPY package.json .

RUN npm install -g npm@latest
RUN npm install gulp

COPY gulpfile.js .
COPY daemon.js .
COPY app.js .
COPY login_ops.js .
COPY token_ops.js .

ENV IP localhost

CMD npm start