TESTS = $(shell find test -name "test*.js")
PRODTESTS = $(shell find test -name "prod*.js")

test:
	@GMAILACCOUNT=mail@example.org GMAILPASSWORD=123 MAIL_RECEIVER=mailto@example.org ./node_modules/.bin/mocha -G $(TESTS)
	@GMAILACCOUNT=mail@example.org GMAILPASSWORD=123 MAIL_RECEIVER=mailto@example.org ./node_modules/.bin/mocha -G $(PRODTESTS)

watch:
	@./node_modules/.bin/mocha -w -G $(TESTS)

.PHONY: test watch
