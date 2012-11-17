process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    mongoose = require('mongoose'),
    Job = mongoose.model('Job'),
    app = require('../../app'),
    queries = require('../../app/helper/queries'),
    query;

var helper = require('../helper');

describe('helper/queries/findAllVisibleOrderedByDate', function(done) {
  beforeEach(function(done) {
    query = queries.findAllVisibleOrderedByDate;
    /* create2 jobs - 1 not visible, 2 visible */
    helper.createThreeJobs(done);
  });

  it('selects just visible jobs', function(done) {
    query(Job, function(err, res) {
      expect(res.length).to.equal(2);
      done();
    });
  });

  it('orders them by date, asc', function(done) {
    query(Job, function(err, res) {
      for (var i = 0; i < (res.length - 1); i++) {
        expect(res[i].date > res[i + 1].date).to.equal(true);
      }
      done();
    });
  });

  it('executes the callback', function(done) {
    query(Job, function(err, res) {
      done();
    });
  });
});

describe('helper/queries/findVisibleJobById', function(done) {
  beforeEach(function(done) {
    query = queries.findVisibleJobById;
    /* create2 jobs - 1 not visible, 2 visible */
    helper.createThreeJobs(done);
  });

  it('selects just visible jobs', function(done) {
    query(1, Job, function(err, res) {
      expect(res[0].company).to.equal('visiblecompany');
      query(0, Job, function(err, res) {
        expect(res).to.eql([]);
        done();
      });
    });
  });
});