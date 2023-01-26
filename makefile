install:
	@ npm ci

list-outdated: install
	@ npm outdated

lint-check:
	@ npx lint

lint-check-ci:
	@ npx lint --output-file lint-check-results.json --output-file-format annotations

lint-fix:
	@ npx lint --fix

type-check:
	@ npx type-check

type-check-ci:
	@ npx type-check --output-file type-check-results.json --output-file-format annotations

security-check:
	@ # NOTE(krishan711): maybe use npm audit
	@ echo "Not Supported"

security-check-ci:
	@ echo "Not Supported"

build:
	@ npx build-react-component

build-ssr:
	@ echo "Not Supported"

build-static:
	@ echo "Not Supported"

build-docs:
	@ npx build-storybook --static-dir ./.storybook/public --docs --output-dir dist

start:
	@ npx build-react-component --start --dev

start-prod:
	@ npx build-react-component --start

start-docs:
	@ npx start-storybook --static-dir ./.storybook/public --docs --port 6006

test:
	@ echo "Not Supported"

publish:
	@ npm publish

publish-next:
ifneq ($(COMMIT_COUNT),0)
	npx kiba-publish --next --next-version $(COMMIT_COUNT)
endif

clean:
	@ rm -rf ./node_modules ./package-lock.json ./build ./dist

.PHONY: *
