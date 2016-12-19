include node.mk

NODE_VERSION := "v6"
SHELL := /bin/bash

$(eval $(call node-version-check,$(NODE_VERSION)))

TEST_FILES := $(shell find . -name "*test.ts*" -not -path "./node_modules/*")
TS_FILES := $(shell find . -name "*.ts" -not -path "./node_modules/*")
TSX_FILES := $(shell find . -name "*.tsx" -not -path "./node_modules/*")

.PHONY: test lint run build $(TEST_FILES)

lint:
	./node_modules/.bin/tslint $(TS_FILES)
	./node_modules/.bin/tslint $(TSX_FILES)
	./node_modules/.bin/eslint -c .eslintrc.yml $(TS_FILES) || true
	./node_modules/.bin/eslint -c .eslintrc.yml $(TSX_FILES) || true

$(TEST_FILES):
	NODE_ENV=test TS_NODE_IGNORE_WARNINGS=2307 ./node_modules/.bin/mocha --require ts-node/register $@

test: $(TEST_FILES)

copy_static_assets:
	rm -rf ./build
	mkdir ./build
	cp -r ./public/* ./build

build: copy_static_assets
	./node_modules/webpack/bin/webpack.js

run: copy_static_assets
	node_modules/webpack/bin/webpack.js --watch & ./node_modules/nodemon/bin/nodemon.js -e .ts --watch server.ts --watch pages --watch lib --exec 'NODE_ENV=development PORT=5020 HOST=localhost ./node_modules/.bin/ts-node --ignoreWarnings 2307 ./server.ts'
