FROM node:15-alpine
COPY . /app
WORKDIR /app 
COPY package*.json ./ 
RUN npm install 
COPY . . 
EXPOSE 5000 
CMD ["npm", "start"]