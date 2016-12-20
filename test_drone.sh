#!/usr/bin/env bash
set -e -u

sed -i.bak s/\${npm_auth_token}/$npm_token/ .npmrc_docker
mv .npmrc_docker .npmrc
npm install

make build
make test
