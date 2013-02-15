process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    request = require('superagent'),
    app = require('../../app'),
    queries = require('../../app/helper/queries');

var helper = require('../helper');

describe('Impressum', function(done) {
  it('should contain all relevant data', function(done) {
    var user1 = request.agent();
    user1
      .get(helper.address + '/impressum')
      .end(function(res) {
        expect(res.text).to.contain('Robert');
        expect(res.text).to.contain('Kowalski');

        expect(res.text).to.contain('Von-Sauer-Str. 33e');
        expect(res.text).to.contain('Hamburg');

        expect(res.text).to.contain('22761');

        done();
      });
  });

  it('should not get indexed by crawlers', function(done) {
    var user1 = request.agent();
    user1
      .get(helper.address + '/impressum')
      .end(function(res) {
        expect(res.text).to.contain('<meta name="robots" content="noindex">');
        done();
      });
  });

});