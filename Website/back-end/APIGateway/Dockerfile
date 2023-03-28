FROM node:18.14.1-alpine3.16

WORKDIR /usr/gate

RUN apk update && apk add curl

COPY package.json .

RUN npm install -g npm@latest
RUN npm install gulp
RUN npm install multer

RUN mkdir -p /usr/gate/uploads

COPY gulpfile.js .
COPY daemon.js .
COPY app.js .

ENV IP localhost
ENV IPDBOPS dbopsc:80
ENV IPDLDER dlderc:80
ENV IPLOGIN loginc:80

CMD npm start