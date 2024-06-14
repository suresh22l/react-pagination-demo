FROM node:22.3.0 AS build
WORKDIR /react-pagination
COPY package.json /react-pagination/package.json
COPY package-lock.json /react-pagination/package-lock.json
RUN npm ci
COPY public/ /react-pagination/public
COPY src/ /react-pagination/src
RUN npm install
CMD ["npm", "start"]