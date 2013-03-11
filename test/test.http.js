var expect = require('chai').expect,
    request = require('supertest'),
    superagent = require('superagent'),
    app = require('../app');

var helper = require('./helper');


describe('app should return http status codes', function(done) {

  beforeEach(function(done) {
    /* create2 jobs - 1 not visible, 2 visible */
    helper.createThreeJobs(done);
  });

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

  describe('if a new job has to be verified', function(done) {
    it('should respond with http status 200', function(done) {
      request(app)
        .get('/jobs/new/verify')
        .expect(200, done);
    });
  });

  describe('if a new job was verified and it is OK', function(done) {
    it('should respond with http status 200', function(done) {
      /* create some fake data */
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
          user1
            .post(helper.address + '/jobs/new/confirm')
            .end(function(res) {
              expect(res.statusCode).to.equal(200);
              done();
            });
        });
    });
  });

  describe('if an existing job has to be verified', function(done) {
    it('should respond with http status 501', function(done) {
      request(app)
        .get('/jobs/1/verify')
        .expect(501, done);
    });
  });

  describe('if an existing job has to be confirmed', function(done) {
    it('should respond with http status 501', function(done) {
      request(app)
        .post('/jobs/1/confirm')
        .expect(501, done);
    });
  });

  describe('if a visible job was requested', function(done) {
    it('should respond with http status 200', function(done) {
      request(app)
        .get('/jobs/2')
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

  describe('if the impressum was requested', function(done) {
    it('should respond with http status 200', function(done) {
      request(app)
        .get('/impressum')
        .expect(200, done);
    });
  });
});
