#!/usr/bin/env bash

node --require ts-node/register/transpile-only --require tsconfig-paths/register ./src/server/index.ts
