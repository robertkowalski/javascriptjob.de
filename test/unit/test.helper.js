process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    mongoose = require('mongoose'),
    Job = mongoose.model('Job'),
    app = require('../../app'),
    queries = require('../../app/helper/queries'),
    query,
    job;

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

  describe('testhelper - model preparation', function(done) {
    it('has 3 jobs', function(done) {
      Job
        .find()
        .exec(function(err, res) {
          expect(res.length).to.equal(3);
          done();
        });
    });

    it('has 2 visible jobs', function(done) {
      Job
        .find({visible: true})
        .exec(function(err, res) {
          expect(res.length).to.equal(2);
          done();
        });
    });

    it('has 1 not visible job', function(done) {
      Job
        .find({visible: false})
        .exec(function(err, res) {
          expect(res.length).to.equal(1);
          done();
        });
    });

  });
});
