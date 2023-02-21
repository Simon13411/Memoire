FROM node:18.14.1-alpine3.16

WORKDIR /usr/src/scapp-front-end

COPY package.json .

RUN npm install -g npm@latest
RUN npm install @fontsource/source-sans-pro

ENV DB_HOST dbtest
ENV DB_USER admin
ENV DB_PASS admin
ENV DB_NAME products

ENV DB_URL http://${DB_USER}:${DB_PASS}@${DB_HOST}:5984

COPY public public
COPY src src

CMD npm start