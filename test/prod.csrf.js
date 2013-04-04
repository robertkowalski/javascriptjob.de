var expect = require('chai').expect,
    request = require('request'),
    app = require('../app'),
    http = require('http'),
    querystring = require('querystring');

var helper = require('./helper');

describe('CSRF', function(done) {

  it('should use csrf tokens in production', function(done) {

    var data = {
      jobtitle: 'foo1',
      company: 'barme1',
      website: 'websity1',
      location: 'locaty1',
      description: 'descripty1',
      howtoapply: 'howtoapplyy1'
    };

    request.post({
        uri: helper.address + '/jobs',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        body: querystring.stringify(data),
        followRedirect: true,
        maxRedirects: 10,
        followAllRedirects: true
        }, function(err, res, body) {
          expect(res.statusCode).to.equal(403);
          expect(body).to.contain('403');

          done();
    });

  });
});