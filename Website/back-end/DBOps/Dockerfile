FROM node:11.0.0-alpine

WORKDIR /usr/dbops

RUN apk update && apk add

COPY package.json .

RUN npm install
RUN npm install azure-storage
RUN npm install multiparty

ADD gulpfile.js .
COPY db_ops.js .
COPY daemon.js .
COPY app.js .

ENV DB_HOST scapp_dbprod
ENV DB_NAME products
ENV ADMIN_NAME admin
ENV ADMIN_PASSW admin
ENV DB_URL http://${ADMIN_NAME}:${ADMIN_PASSW}@${DB_HOST}:5984/${DB_NAME}

CMD npm start