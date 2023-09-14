include node.mk

NODE_VERSION := "v18"
SHELL := /bin/bash

$(eval $(call node-version-check,$(NODE_VERSION)))

TS_FILES := $(shell find src/ types/ -name "*.ts" -o -name "*.tsx")
LESS_FILES := $(shell find src/ -name "*.less")
JSON_FILES := $(shell find src/ -name "*.json")
CONFIG_FILES := $(shell find . .circleci/ jest/ launch/ -maxdepth 1 -name "*.js" -o -name "*.json" -o -name "*.yml")
FORMATTED_FILES := $(TS_FILES) $(LESS_FILES) # Add other file types as you see fit, e.g. JSON files, config files
MODIFIED_FORMATTED_FILES := $(shell git diff --name-only master $(FORMATTED_FILES))
SVGS := $(shell find src/ -name "*.svg")

ESLINT := ./node_modules/.bin/eslint
JEST := ./node_modules/.bin/jest
NODEMON := ./node_modules/.bin/nodemon
PRETTIER := ./node_modules/.bin/prettier
STYLELINT := ./node_modules/.bin/stylelint
SVGO := ./node_modules/.bin/svgo
WEBPACK := ./node_modules/.bin/webpack

.PHONY: format format-all format-check lint-es lint-fix lint-style lint test-jest type-check-server test clean copy-static-assets build run

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

# For optimizing SVGs
svgo:
	@echo "Running svgo..."
	@$(SVGO) --pretty --indent=0 $(SVGS)

lint-es:
	@echo "Running eslint..."
	@$(ESLINT) $(TS_FILES)

lint-fix:
	@echo "Running eslint --fix..."
	@$(ESLINT) --fix $(TS_FILES) || \
		(echo "\033[0;31mThe above errors require manual fixing.\033[0m" && true)

lint-style:
	@echo "Running stylelint..."
	@$(STYLELINT) $(LESS_FILES)

lint: format-check lint-es lint-style

test-jest:
	@echo "Running jest..."
	@IS_TEST=1 $(JEST) --passWithNoTests --maxWorkers=1

# Note that we don't need a separate command for type checking the client. Webpack handles that
type-check-server:
	@echo "Type checking server..."
	@./scripts/typeCheckServer.sh

test: test-jest type-check-server

clean:
	@rm -rf ./build/

copy-static-assets: clean
	@mkdir ./build/
	@cp -r ./public/* ./build/

build: clean copy-static-assets
	@$(WEBPACK)

run: clean copy-static-assets
	@$(WEBPACK) serve & $(NODEMON) --watch ./src/server/ --watch ./src/shared/ -e ts --exec 'NODE_ENV=development ./scripts/startDevServer.sh'
