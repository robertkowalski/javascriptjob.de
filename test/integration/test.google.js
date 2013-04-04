var expect = require('chai').expect,
    request = require('request'),
    app = require('../../app'),
    queries = require('../../app/helper/queries');

var helper = require('../helper');

describe('Tracking', function(done) {
  it('must anonymize the ip of the visitor for google', function(done) {

    request(helper.address + '/', function(err, res, body) {
      expect(body).to.contain('_gat._anonymizeIp');

      done();
    });
  });
});


