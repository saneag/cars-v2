FROM node:16.18.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm build

FROM nginx:latest
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .