FROM node:18.14.1-alpine3.16

WORKDIR /usr/src/scapp-front-end

COPY package.json .

RUN npm install -g npm@latest
RUN npm install @fontsource/source-sans-pro

COPY public public
COPY src src

ENV REACT_APP_IP http://localhost:4000

CMD npm start