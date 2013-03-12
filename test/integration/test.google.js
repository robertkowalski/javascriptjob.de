var expect = require('chai').expect,
    request = require('superagent'),
    app = require('../../app'),
    queries = require('../../app/helper/queries');

var helper = require('../helper');

describe('Tracking', function(done) {
  it('must anonymize the ip of the visitor for google', function(done) {
    var user1 = request.agent();
    user1
      .get(helper.address + '/')
      .end(function(res) {
        expect(res.text).to.contain('_gat._anonymizeIp');
        done();
      });
  });
});


