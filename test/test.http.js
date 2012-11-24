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
    it('should respond with http status 200', function(done) {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('if a job was requested', function(done) {
    it('should respond with http status 200', function(done) {
      request(app)
        .get('/jobs/1')
        .expect(200, done);
    });
  });

  describe('destroying a job with DELETE', function(done) {
    it('should respond with http status 405', function(done) {
      request(app)
        .del('/jobs/1')
        .expect(405, done);
    });
  });

  describe('updating a job with PUT', function(done) {
    it('should respond with http status 405', function(done) {
      request(app)
        .put('/jobs/1')
        .expect(405, done);
    });
  });
});
