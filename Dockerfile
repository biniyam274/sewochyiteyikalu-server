FROM node:latest

ENV NODE_ENV=production
ENV CONNECTIONSTRING=mongodb+srv://BenZack:13abwDWnfaGvAOfC@benjacluster1.o0zuh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

RUN npm install pm2@latest -g

#set environment variable

# Create app directory

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package.json .

RUN npm install

# If you are building your code for production

# RUN npm ci --only=production

# Bundle app source


EXPOSE  5000

COPY . .

CMD [ "npm", "start" ]




