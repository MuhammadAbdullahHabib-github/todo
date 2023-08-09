FROM node:16
WORKDIR /backend
COPY ./package*.json ./
RUN npm install
COPY . ./backend
EXPOSE 7000
CMD ["npm", "run", "dev"]