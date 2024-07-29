FROM node:20.15.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3547

RUN apt-get update && apt-get install -y python3 g++ make

RUN npm rebuild better-sqlite3

CMD ["npm", "run", "start"]
