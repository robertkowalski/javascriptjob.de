var expect = require('chai').expect,
    request = require('request'),
    app = require('../../app'),
    queries = require('../../app/helper/queries');

var helper = require('../helper');

describe('Custom Errorpages', function(done) {
  it('should contain a human readable error code', function(done) {

    request(helper.address + '/ThisWillNeverExist', function(err, res, body) {
      expect(body).to.contain('404');

      done();
    });
  });

  it('should contain a link to the index', function(done) {
    request(helper.address + '/ThisWillNeverExist', function(err, res, body) {
      expect(body).to.contain('<a href="/"');

      done();
    });
  });

});