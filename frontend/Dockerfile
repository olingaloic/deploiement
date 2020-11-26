FROM node:7.10 as frontend-build
WORKDIR /fullstack/frontend

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

EXPOSE 8080
CMD ["npm", "start"]