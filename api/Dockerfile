FROM node:18.14.1-alpine3.17

WORKDIR /usr/src/api

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
