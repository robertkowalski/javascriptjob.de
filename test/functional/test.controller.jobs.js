process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../app');

describe('jobs', function(done) {

  describe('POST /jobs #=> create', function(done) {
    it('should re-render if the job could not created', function(done) {
      request(app)
        .post('/jobs')
        .send({
          searchquery: 'bla'
        })
        .end(function(err, res){
          if (err) {
            return done(err);
          }
          expect(res.text).to.contain('forum index');
          done();
        });
    });
  });

  describe('GET /jobs #=> index', function(done) {
    it('should respond with http status 200', function(done) {
      request(app)
        .get('/jobs')
        .expect(200)
        .end(function(err, res){
          if (err) {
            return done(err);
          }
          expect(res.text).to.contain('forum index');
          done();
        });
    });
  });

  describe('GET / #=> index', function(done) {
    it('should respond with http status 200', function(done) {
      request(app)
        .get('/jobs')
        .expect(200)
        .end(function(err, res){
          if (err) {
            return done(err);
          }
          expect(res.text).to.contain('forum index');
          done();
        });
    });
  });
});
