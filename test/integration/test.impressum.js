var expect = require('chai').expect,
    request = require('request'),
    app = require('../../app'),
    queries = require('../../app/helper/queries');

var helper = require('../helper');

describe('Impressum', function(done) {
  it('should contain all relevant data', function(done) {
    request(helper.address + '/impressum', function(err, res, body) {
      expect(body).to.contain('Robert');
      expect(body).to.contain('Kowalski');

      expect(body).to.contain('Von-Sauer-Str. 33e');
      expect(body).to.contain('Hamburg');

      expect(body).to.contain('22761');

      done();
    });
  });

  it('should not get indexed by crawlers', function(done) {
    request(helper.address + '/impressum', function(err, res, body) {
      expect(body).to.contain('<meta name="robots" content="noindex">');

      done();
    });
  });

});