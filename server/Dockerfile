FROM node

WORKDIR /app

COPY package.json .

RUN npm install

ADD uploads /app/uploads

COPY . .

EXPOSE 5000

CMD ["npm", "start"]