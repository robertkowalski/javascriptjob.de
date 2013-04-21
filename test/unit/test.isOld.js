var expect = require('chai').expect,
    isOld = require('../../app/helper/isOld');

var today = new Date();

describe('helper/isOld', function(done) {

  it('return false if the date is 31 days ago', function() {
    var testDate = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 31);

    expect(isOld(testDate)).to.equal(true);
  });

  it('return true if the date is 30 days ago', function() {
    var testDate = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 30);

    expect(isOld(testDate)).to.equal(true);
  });

  it('return true if the date is 29 days ago', function() {
    var testDate = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 29);

    expect(isOld(testDate)).to.equal(false);
  });

  it('return true if the argument is falsy', function() {

    expect(isOld(undefined)).to.equal(true);
  });
});