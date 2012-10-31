process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    request = require('supertest'),
    app = require('../../app');

var agent = require('superagent');

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
          expect(res.text).to.contain('Moved Temporarily. Redirecting to /jobs/');
          done();
        });
    });

    it('should redirect to the created job if a valid job was posted', function(done) {
      request(app)
        .post('/jobs')
        .send({
          jobtitle: 'Gelötsrockstar',
          company: 'Gelötsagentur',
          website: 'http://foo.de',
          location: 'Hamburg',
          description: 'lirum larum',
          howtoapply: 'by mail',
        })
        .end(function(err, res){
          if (err) {
            return done(err);
          }
          expect(res.text).to.contain('Moved Temporarily. Redirecting to /jobs/0');
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
          expect(res.text).to.contain('JavaScript Jobs');
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
          expect(res.text).to.contain('JavaScript Jobs');
          done();
        });
    });
  });
});
