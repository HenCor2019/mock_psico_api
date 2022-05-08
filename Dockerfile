FROM node:17

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
