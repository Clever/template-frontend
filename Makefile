include node.mk

NODE_VERSION := "v12"
SHELL := /bin/bash

$(eval $(call node-version-check,$(NODE_VERSION)))

TS_FILES := $(shell find src -name "*.ts" -o -name "*.tsx")
LESS_FILES := $(shell find src -name "*.less")
FORMATTED_FILES := $(TS_FILES) $(LESS_FILES) # Add other file types as you see fit, e.g. JSON files, config files
MODIFIED_FORMATTED_FILES := $(shell git diff --name-only master $(FORMATTED_FILES))

ESLINT := ./node_modules/.bin/eslint
PRETTIER := ./node_modules/.bin/prettier

.PHONY: format format-all format-check lint-es lint-fix lint test copy-static-assets build run

format:
	@echo "Formatting modified files..."
	@$(PRETTIER) --write $(MODIFIED_FORMATTED_FILES)

format-all:
	@echo "Formatting all files..."
	@$(PRETTIER) --write $(FORMATTED_FILES)

format-check:
	@echo "Running format check..."
	@$(PRETTIER) --list-different $(FORMATTED_FILES) || \
		(echo -e "❌ \033[0;31mPrettier found discrepancies in the above files. Run 'make format' to fix.\033[0m" && false)

lint-es:
	@echo "Running eslint..."
	@$(ESLINT) $(TS_FILES)

lint-fix:
	@echo "Running eslint --fix..."
	@$(ESLINT) --fix $(TS_FILES) || \
		(echo "\033[0;31mThe above errors require manual fixing.\033[0m" && true)

lint-style:
	@echo "Running stylelint..."
	@./node_modules/.bin/stylelint $(LESS_FILES)

lint: format-check lint-es lint-style

test:
	@./node_modules/.bin/jest --passWithNoTests --maxWorkers=1

copy-static-assets:
	@rm -rf ./__build
	@mkdir ./__build
	@cp -r ./public/* ./__build

build: copy-static-assets
	@./node_modules/webpack/bin/webpack.js

run: copy-static-assets
	@node_modules/webpack/bin/webpack.js --watch & ./node_modules/.bin/nodemon --watch src/server --watch src/shared -e ts --exec 'NODE_ENV=development PORT=5020 HOST=localhost ./node_modules/.bin/ts-node --require tsconfig-paths/register ./src/server/index.ts'
