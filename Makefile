TESTS = $(shell find test -name "test*.js")
PRODTESTS = $(shell find test -name "prod*.js")

test:
	@NODE_ENV=test SESSION_SECRET=lolcat GMAIL_ACCOUNT=mail@example.org GMAIL_PASSWORD=123 MAIL_RECEIVER=mailto@example.org ./node_modules/.bin/mocha -G $(TESTS)
	@NODE_ENV=production MONGO_DBNAME=mydb_test MONGO_PORT=27017 MONGO_USER=travis MONGO_PW=test MONGO_HOST='127.0.0.1' SESSION_SECRET=lolcat GMAIL_ACCOUNT=mail@example.org GMAIL_PASSWORD=123 MAIL_RECEIVER=mailto@example.org ./node_modules/.bin/mocha -G $(PRODTESTS)

watch:
	@./node_modules/.bin/mocha -w -G $(TESTS)

.PHONY: test watch
