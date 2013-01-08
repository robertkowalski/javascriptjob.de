process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    request = require('superagent'),
    app = require('../../app'),
    queries = require('../../app/helper/queries');

var helper = require('../helper');

describe('Creation of Jobs', function(done) {
  it('should show flash error messages when invalid data is submitted', function(done) {
    var user1 = request.agent();
    user1
      .post(helper.address + '/jobs')
      .send({
        jobtitle: '',
        company: '',
        website: '',
        location: '',
        description: '',
        howtoapply: ''
      })
      .end(function(res) {
        expect(res.text).to.contain('<div id="messages"');
        expect(res.text).to.contain('<ul class="error"');
        done();
      });
  });
});

describe('Listing of 3 Jobs - 2 visible', function(done) {
  var query;

  beforeEach(function(done) {
    query = queries.findAllVisibleOrderedByDate;
    /* create2 jobs - 1 not visible, 2 visible */
    helper.createThreeJobs(done);
  });

 it('both visible jobs', function(done) {
    var user1 = request.agent();
    user1
      .get(helper.address + '/jobs')
      .end(function(res) {
        expect(res.text).to.contain('visiblecompany');
        expect(res.text).to.contain('visiblecompany2');

        expect(res.text).to.contain('moon');
        expect(res.text).to.contain('mars');

        expect(res.text).to.contain('job2');
        expect(res.text).to.contain('job3');

        done();
      });
  });
});

describe('Detaillisting of Jobs', function(done) {
  var query;

  beforeEach(function(done) {
    query = queries.findAllVisibleOrderedByDate;
    /* create2 jobs - 1 not visible, 2 visible */
    helper.createThreeJobs(done);
  });

 it('both visible jobs', function(done) {
    var user1 = request.agent();
    user1
      .get(helper.address + '/jobs/1')
      .end(function(res) {
        expect(res.text).to.contain('visiblecompany');
        expect(res.text).to.contain('moon');
        expect(res.text).to.contain('job2');

        done();
      });
  });
});

describe('Verifying a job', function(done) {
 it('a valid job was created', function(done) {

    var user1 = request.agent();
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
        expect(res.text).to.contain('foomy');
        expect(res.text).to.contain('barme');
        expect(res.text).to.contain('websity');
        expect(res.text).to.contain('locaty');
        expect(res.text).to.contain('descripty');
        expect(res.text).to.contain('howtoapplyy');
        done();
      });

  });
});