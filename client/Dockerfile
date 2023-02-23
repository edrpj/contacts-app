FROM node:18.14.1-alpine3.17

WORKDIR /usr/src/client

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4173

CMD [ "yarn", "preview" ]
