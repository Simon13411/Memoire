FROM node:18.14.1-alpine3.16 as build

WORKDIR src/front-end

COPY package*.json .

RUN npm install -g npm@latest
RUN npm install browserslist

COPY public public
COPY src src

#ENV REACT_APP_IP http://localhost:4000
ENV REACT_APP_IP http://gx-cloud45.segi.ulg.ac.be:4000

#dev env
#CMD npm start

#production
RUN npm run build

# production env
FROM nginx:stable-alpine
COPY --from=build /src/front-end/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
