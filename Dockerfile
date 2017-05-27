FROM node:latest
EXPOSE 4200

WORKDIR /usr/src/app
ADD .angular-cli.json package.json tsconfig.json tslint.json yarn.lock ./

RUN yarn

CMD ["npm", "start", "--", "--host", "frontend", "--poll", "500"]
