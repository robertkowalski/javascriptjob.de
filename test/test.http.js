process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../app');

describe('app should return http status codes', function(done) {

  describe('if a non existing site was requested', function(done) {
    it('should respond with http status 404', function() {
      request(app)
        .get('/trolololo')
        .expect(404, done);
    });
  });

  describe('if the home was requested', function(done) {
    it('should respond with http status 200', function() {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });
});
