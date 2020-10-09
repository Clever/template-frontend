#!/usr/bin/env bash

IS_TEST=1 ./node_modules/.bin/ts-node --require tsconfig-paths/register -e 'import "./src/server/index.ts"; process.exit(0);'
