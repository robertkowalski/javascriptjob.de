require('../../config/db');

var expect = require('chai').expect,
    mongoose = require('mongoose'),
    Job = mongoose.model('Job'),
    Counter = mongoose.model('Counter');

require('../helper');

describe('Job With counter', function(done) {

  it('every job gets an id that is rising (from the counter)', function(done) {
    var c;
    Job.count({}, function(err, count) {
      c = count + 1;
      var job = new Job({
        jobtitle: 'foo',
        company: 'barcompany',
        website: 'website',
        location: 'moon',
        description: 'best jobs on the moon',
        howtoapply: 'send a pidgin!',
        date: new Date()
      });

      var job2 = new Job({
        jobtitle: 'foo',
        company: 'barcompany',
        website: 'website',
        location: 'moon',
        description: 'best jobs on the moon',
        howtoapply: 'send a pidgin!',
        date: new Date()
      });

      job.save(function(err, job) {
        if (err) {
          console.error(err);
        }
        expect(job.id).to.equal(c);
        job2.save(function(err, job) {
          if (err) {
            console.error(err);
          }
          expect(job.id).to.equal(c + 1);
          done();
        });
      });
    });
  });
});