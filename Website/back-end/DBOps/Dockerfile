FROM node:18.14.1-alpine3.16

WORKDIR /usr/dbops

RUN apk update && apk add

COPY package.json .

RUN npm install -g npm@latest
RUN npm install multer

RUN apk add --no-cache python3
RUN apk add py3-pip
RUN apk add --no-cache postgresql-dev \
    musl-dev \
    gcc \
    lapack-dev \
    g++ \
    gfortran \
    python3-dev
RUN pip3 install --upgrade pip setuptools wheel
RUN pip3 install --upgrade cython
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

RUN mkdir -p /usr/dbops/uploads

ADD gulpfile.js .
COPY db_ops.js .
COPY daemon.js .
COPY app.js .
COPY scripts/ .
RUN mkdir FilesToReturn

ENV DB_HOST scapp_dbprod
ENV DB_NAME products
ENV ADMIN_NAME admin
ENV ADMIN_PASSW admin
ENV DB_URL http://${ADMIN_NAME}:${ADMIN_PASSW}@${DB_HOST}:5984/${DB_NAME}

CMD npm start
