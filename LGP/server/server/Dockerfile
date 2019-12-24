FROM node:8-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN apk update && apk add python make g++

COPY package.json ./

RUN npm install

COPY . .

RUN rm -rf /root/.composer/

RUN mv .composer /root
