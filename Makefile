TESTS = $(shell find test -name "test*.js")
PRODTESTS = $(shell find test -name "prod*.js")

test:
	@SESSION_SECRET=lolcat GMAIL_ACCOUNT=mail@example.org GMAIL_PASSWORD=123 MAIL_RECEIVER=mailto@example.org ./node_modules/.bin/mocha -G $(TESTS)
	@SESSION_SECRET=lolcat GMAIL_ACCOUNT=mail@example.org GMAIL_PASSWORD=123 MAIL_RECEIVER=mailto@example.org ./node_modules/.bin/mocha -G $(PRODTESTS)

watch:
	@./node_modules/.bin/mocha -w -G $(TESTS)

.PHONY: test watch
