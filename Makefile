TESTS = $(shell find test -name "test*.js")

test:
	@./node_modules/.bin/mocha $(TESTS)

watch:
	@./node_modules/.bin/mocha -w -G $(TESTS)

.PHONY: test watch
