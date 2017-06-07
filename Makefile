include node.mk

NODE_VERSION := "v6"
SHELL := /bin/bash

$(eval $(call node-version-check,$(NODE_VERSION)))

TEST_FILES := $(shell find . -name "*test.ts*" -not -path "./node_modules/*")
TS_FILES := $(shell find . -name "*.ts" -not -path "./node_modules/*")
TSX_FILES := $(shell find . -name "*.tsx" -not -path "./node_modules/*")
LESS_FILES := $(shell find . -name "*.less" -not -path "./node_modules/*" -not -path "./dist/*" -not -path "./vendor/*")

.PHONY: test lint run build $(TEST_FILES)

lint:
	./node_modules/.bin/tslint $(TS_FILES)
	./node_modules/.bin/tslint $(TSX_FILES)
	./node_modules/.bin/stylelint --config ./.stylelintrc $(LESS_FILES)

$(TEST_FILES):
	./node_modules/.bin/jest

test: $(TEST_FILES)

copy_static_assets:
	rm -rf ./build
	mkdir ./build
	cp -r ./public/* ./build

build: copy_static_assets
	./node_modules/webpack/bin/webpack.js

run: copy_static_assets
	node_modules/webpack/bin/webpack.js --watch & ./node_modules/nodemon/bin/nodemon.js -e .ts,jsx,tsx,less --watch src/backend/**/*.[jt]sx? --exec 'NODE_ENV=development PORT=5020 HOST=localhost ./node_modules/.bin/ts-node --ignoreWarnings 2307 ./src/backend/index.ts'
