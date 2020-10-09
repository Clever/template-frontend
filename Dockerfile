FROM node:12-slim

WORKDIR /{{.AppName}}

COPY . /{{.AppName}}
RUN npm install

CMD ./node_modules/.bin/ts-node --require tsconfig-paths/register src/server/index.ts
