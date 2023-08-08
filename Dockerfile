FROM node:16
WORKDIR /backend
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 5500
CMD ["npm", "run", "dev"]