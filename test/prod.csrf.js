process.env.NODE_ENV = 'production';

var expect = require('chai').expect,
    request = require('supertest'),
    superagent = require('superagent'),
    app = require('../app'),
    http = require('http');

var helper = require('./helper');

describe('CSRF', function(done) {

  it('should use csrf tokens in production', function(done) {
    var user1 = superagent.agent();
    user1
      .post(helper.address + '/jobs')
      .send({
        jobtitle: 'foomy',
        company: 'barme',
        website: 'websity',
        location: 'locaty',
        description: 'descripty',
        howtoapply: 'howtoapplyy'
      })
      .end(function(res) {
        expect(res.status).to.equal(403);
        expect(res.text).to.contain('403');
        done();
      });
  });
});