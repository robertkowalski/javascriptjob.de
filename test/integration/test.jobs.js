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
      .end(function(res){
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
      .end(function(res){
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