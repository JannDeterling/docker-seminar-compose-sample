FROM node:11.14.0

WORKDIR app
COPY src ./
COPY ./package.json ./
COPY views ./views
RUN npm install --save

CMD ["node", "index.js"]
