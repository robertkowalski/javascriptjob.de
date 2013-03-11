require('../../db');

var expect = require('chai').expect,
    mongoose = require('mongoose'),
    Job = mongoose.model('Job'),
    queries = require('../../app/helper/queries'),
    query;

var helper = require('../helper');

/**
 * Validate the testhelper
 */

describe('testhelper - model preparation', function(done) {

  beforeEach(function(done) {
    query = queries.findAllVisibleOrderedByDate;
    helper.createThreeJobs(done);
  });

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