FROM node:20-alpine

WORKDIR /app

ADD . /app

RUN yarn workspace server build

EXPOSE 3000

ENTRYPOINT ["yarn", "workspace", "server", "start:prod"]