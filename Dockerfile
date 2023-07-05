FROM node:12-slim

WORKDIR /{{.AppName}}
COPY . /{{.AppName}}
RUN npm install

# Precompile node assets and resolve tsconfig.json paths
RUN npx tsc && npx tsc-alias --outDir .

CMD NODE_ENV=production NODE_OPTIONS="$_CLEVER_DEFAULT_NODE_OPTIONS" ./scripts/startServer.sh
