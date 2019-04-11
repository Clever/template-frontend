FROM node:10-slim

WORKDIR /{{.AppName}}

COPY . /{{.AppName}}
RUN npm install

CMD ./node_modules/.bin/ts-node --ignoreWarnings 2307 --require tsconfig-paths/register src/server/index.ts
