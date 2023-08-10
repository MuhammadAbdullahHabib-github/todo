FROM nodesource/node:16.13.2
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
EXPOSE 7000
CMD ["npm","run","dev"]
