FROM node:carbon
RUN mkdir /usr/app
WORKDIR /usr/app

RUN yarn global add truffle
COPY ./package.json ./yarn.lock /usr/app/
RUN yarn

COPY . /usr/app/
