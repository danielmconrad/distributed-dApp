FROM node:carbon
WORKDIR /app
ENV PATH="/app/node_modules/.bin:/opt/gtk/bin:${PATH}"

COPY ./app/package*.json ./
RUN npm install

COPY ./app .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
