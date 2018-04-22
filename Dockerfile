FROM node:carbon
WORKDIR /usr/app
ENV PATH="./node_modules/.bin:/opt/gtk/bin:${PATH}"

COPY ./package.json .
RUN npm install --quiet

COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]
