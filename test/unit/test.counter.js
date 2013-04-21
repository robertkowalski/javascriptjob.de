require('../../config/db');

var expect = require('chai').expect,
    mongoose = require('mongoose'),
    Job = mongoose.model('Job'),
    Counter = mongoose.model('Counter');

require('../helper');

describe('Counter', function(done) {

  it('has one ID', function() {

    expect(Counter.ID).to.equal('jobcount');
  });

  it('has an increment function', function() {

    expect(typeof Counter.increment).to.equal('function');
  });

  it('handles unknown ids without error', function(done) {
    Counter.increment('unknown', function(err, unknown) {
      expect(unknown.next).to.equal(1);
      done();
    });
  });

  it('increments the field next every time increment is called', function(done) {
    Counter.increment('foo', function(err, foo) {
      expect(foo.next).to.equal(1);
      Counter.increment('foo', function(err, field) {
        expect(field.next).to.equal(2);
        done();
      });
    });
  });

  it('calls the callback after incrementing the field', function(done) {
    Counter.increment('bla', function(err, bla) {
      done();
    });
  });
});