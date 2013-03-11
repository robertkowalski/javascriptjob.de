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
        expect(res.text).to.contain('Foo');
        expect(res.text).to.contain('Jimdo GmbH');

        expect(res.text).to.contain('München');
        expect(res.text).to.contain('Hamburg');

        expect(res.text).to.contain('Node.js Developer - Backend');
        expect(res.text).to.contain('Endgegner gesucht');

        done();
      });
  });
});

describe('Detaillisting of Jobs', function(done) {
  beforeEach(function(done) {
    /* create2 jobs - 1 not visible, 2 visible */
    helper.createThreeJobs(done);
  });

 it('both visible jobs', function(done) {
    var user1 = request.agent();
    user1
      .get(helper.address + '/jobs/2')
      .end(function(res) {
        expect(res.text).to.contain('Foo Inc.');
        expect(res.text).to.contain('moon');
        expect(res.text).to.contain('Node.js Developer - Backend');

        done();
      });
  });
});

describe('Verifying a job', function(done) {
 it('after posting a valid job one should verify the input', function(done) {
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

 it('should show the entered data after clicking back on the screen where I validate the data', function(done) {
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
        user1
          .get(helper.address + '/jobs/new')
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

 it('should prevent XSS where I validate the data', function(done) {
    var user1 = request.agent();
    user1
      .post(helper.address + '/jobs')
      .send({
        jobtitle: '<script>alert(0);</script>',
        company: 'barme',
        website: 'websity',
        location: 'locaty',
        description: 'descripty',
        howtoapply: 'howtoapplyy'
      })
      .end(function(res) {
        user1
          .get(helper.address + '/jobs/new')
          .end(function(res) {
            expect(res.text).to.contain('[removed]alert&#40;0&#41;;[removed]');
            expect(res.text).to.contain('barme');
            expect(res.text).to.contain('websity');
            expect(res.text).to.contain('locaty');
            expect(res.text).to.contain('descripty');
            expect(res.text).to.contain('howtoapplyy');
            done();
          });
      });
  });

});