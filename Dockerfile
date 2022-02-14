FROM node:14.16.1-alpine

WORKDIR /app

RUN echo "WEB PORT =>>>" $PORT

RUN npm install -g serve

COPY ./package.json ./

RUN npm install

COPY ./ ./

RUN npm run build

EXPOSE $PORT

CMD npx serve build -l $PORT