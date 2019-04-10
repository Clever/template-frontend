include node.mk

NODE_VERSION := "v10"
SHELL := /bin/bash

$(eval $(call node-version-check,$(NODE_VERSION)))

TS_FILES := $(shell find . -name "*.ts" -not -path "./node_modules/*")
TSX_FILES := $(shell find . -name "*.tsx" -not -path "./node_modules/*")
LESS_FILES := $(shell find . -name "*.less" -not -path "./node_modules/*" -not -path "./dist/*" -not -path "./vendor/*")

.PHONY: test lint run build $(TEST_FILES)

lint:
	./node_modules/.bin/tslint $(TS_FILES)
	./node_modules/.bin/tslint $(TSX_FILES)
	./node_modules/.bin/stylelint --config ./.stylelintrc $(LESS_FILES)

test:
	./node_modules/.bin/jest

copy_static_assets:
	rm -rf ./__build
	mkdir ./__build
	cp -r ./public/* ./__build

build: copy_static_assets
	./node_modules/webpack/bin/webpack.js

run: copy_static_assets
	node_modules/webpack/bin/webpack.js --watch & ./node_modules/.bin/nodemon --watch src/server --watch src/shared -e ts --exec 'NODE_ENV=development PORT=5020 HOST=localhost ./node_modules/.bin/ts-node --require tsconfig-paths/register ./src/server/index.ts'
