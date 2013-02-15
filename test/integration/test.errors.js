process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    request = require('superagent'),
    app = require('../../app'),
    queries = require('../../app/helper/queries');

var helper = require('../helper');

describe('Impressum', function(done) {
  it('should contain a human readable error code', function(done) {
    var user1 = request.agent();
    user1
      .get(helper.address + '/ThisWillNeverExist')
      .end(function(res) {
        expect(res.text).to.contain('404');
        done();
      });
  });

  it('should contain a link to the index', function(done) {
    var user1 = request.agent();
    user1
      .get(helper.address + '/ThisWillNeverExist')
      .end(function(res) {
        expect(res.text).to.contain('<a href="/"');
        done();
      });
  });

});