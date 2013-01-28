process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    request = require('superagent'),
    app = require('../../app'),
    queries = require('../../app/helper/queries');

var helper = require('../helper');

describe('Index', function(done) {
  it('should link to Impressum', function(done) {
    var user1 = request.agent();
    user1
      .get(helper.address + '/')
      .end(function(res) {
        expect(res.text).to.contain('<a href="/impressum">Impressum</a>');
        done();
      });
  });
});