var expect = require('chai').expect,
    supertest = require('supertest'),
    request = require('request'),
    app = require('../app'),
    querystring = require('querystring');

var helper = require('./helper');


describe('app should return http status codes', function(done) {

  beforeEach(function(done) {
    /* create2 jobs - 1 not visible, 2 visible */
    helper.createThreeJobs(done);
  });

  describe('x-powered-by header', function(done) {
    it('should be disabled', function() {
      supertest(app)
        .get('/user')
        .end(function(err, res){
          if (err) throw err;
          expect(res.header['x-powered-by']).to.equal(undefined);
        });
    });
  });

  describe('if a non existing site was requested', function(done) {
    it('should respond with http status 404', function() {
      supertest(app)
        .get('/trolololo')
        .expect(404, done);
    });
  });

  describe('if the home was requested', function(done) {
    it('should respond with http status 200', function(done) {
      supertest(app)
        .get('/')
        .expect(200, done);
    });
  });

  describe('if a new job has to be verified', function(done) {
    it('should respond with http status 200', function(done) {
      supertest(app)
        .get('/jobs/new/verify')
        .expect(200, done);
    });
  });

  describe('if a job is not visible', function(done) {
    it('should respond with http status 404', function(done) {
      supertest(app)
        .get('/jobs/1')
        .expect(404, done);
    });
  });

  describe('if a new job was verified and it is OK', function(done) {
    it('should respond with http status 200', function(done) {


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
            expect(res.statusCode).to.equal(200);
            done();
      });
    });
  });

  describe('if an existing job has to be verified', function(done) {
    it('should respond with http status 501', function(done) {
      supertest(app)
        .get('/jobs/1/verify')
        .expect(501, done);
    });
  });

  describe('if an existing job has to be confirmed', function(done) {
    it('should respond with http status 501', function(done) {
      supertest(app)
        .post('/jobs/1/confirm')
        .expect(501, done);
    });
  });

  describe('if a visible job was requested', function(done) {
    it('should respond with http status 200', function(done) {
      supertest(app)
        .get('/jobs/2')
        .expect(200, done);
    });
  });

  describe('destroying a job with DELETE', function(done) {
    it('should respond with http status 405', function(done) {
      supertest(app)
        .del('/jobs/1')
        .expect(405, done);
    });
  });

  describe('updating a job with PUT', function(done) {
    it('should respond with http status 405', function(done) {
      supertest(app)
        .put('/jobs/1')
        .expect(405, done);
    });
  });

  describe('if the impressum was requested', function(done) {
    it('should respond with http status 200', function(done) {
      supertest(app)
        .get('/impressum')
        .expect(200, done);
    });
  });
});
