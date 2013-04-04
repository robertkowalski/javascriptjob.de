var expect = require('chai').expect,
    request = require('request'),
    app = require('../../app'),
    queries = require('../../app/helper/queries');

var helper = require('../helper');

describe('Index', function(done) {
  it('should link to Impressum', function(done) {
      request(helper.address + '/', function(err, res, body) {
        expect(body).to.contain('<a href="/impressum">Impressum</a>');

        done();
      });
  });
});