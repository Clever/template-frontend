FROM node:12-slim

WORKDIR /{{.AppName}}
COPY . /{{.AppName}}
RUN npm install

CMD NODE_ENV=production NODE_OPTIONS="$_CLEVER_DEFAULT_NODE_OPTIONS" ./scripts/startServer.sh
