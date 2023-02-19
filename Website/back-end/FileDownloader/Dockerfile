FROM node:11.0.0-alpine

WORKDIR /usr/dlder

RUN apk update && apk add curl

COPY package.json .

RUN npm install

COPY gulpfile.js .
COPY daemon.js .
COPY app.js .
RUN mkdir -p /usr/dlder/Files
COPY Files/Individuals.xlsx Files/.
COPY Files/Boxes.xlsx Files/.

ENV IP localhost

CMD npm start