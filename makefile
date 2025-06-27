install:
	@ npm ci --legacy-peer-deps

install-updates:
	@ npm install --legacy-peer-deps

list-outdated: install
	@ npm outdated --legacy-peer-deps

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
	@ NODE_ENV=production npx build-module-rolldown --config-modifier ./config.build.js

build-ssr:
	@ echo "Not Supported"

build-static:
	@ echo "Not Supported"

build-docs:
	@ npx storybook build --docs --output-dir dist

start:
	@ NODE_ENV=development npx build-module-rolldown --start --config-modifier ./config.build.js

start-prod:
	@ NODE_ENV=production npx build-module-rolldown --start --config-modifier ./config.build.js

start-docs:
	@ npx storybook dev --docs --port 6006

test:
	@ echo "Not Supported"

publish:
	@ npm publish

publish-next:
ifneq ($(NEXT_VERSION),0)
ifneq ($(NEXT_TYPE),)
	npx kiba-publish --next --next-version $(NEXT_VERSION) --next-type $(NEXT_TYPE)
else
	npx kiba-publish --next --next-version $(NEXT_VERSION)
endif
endif

clean:
	@ rm -rf ./node_modules ./package-lock.json ./build ./dist

.PHONY: *
