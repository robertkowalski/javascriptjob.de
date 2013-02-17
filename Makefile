TESTS = $(shell find test -name "test*.js")
PRODTESTS = $(shell find test -name "prod*.js")

test:
	@./node_modules/.bin/mocha -G $(TESTS)
	@./node_modules/.bin/mocha -G $(PRODTESTS)

watch:
	@./node_modules/.bin/mocha -w -G $(TESTS)

.PHONY: test watch
