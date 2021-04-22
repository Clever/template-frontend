#!/usr/bin/env bash

./node_modules/.bin/ts-node --require ./tracing.ts --require tsconfig-paths/register --transpile-only ./src/server/index.ts
