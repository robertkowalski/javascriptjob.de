process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    mongoose = require('mongoose'),
    Job = mongoose.model('Job'),
    app = require('../../app');

require('../helper');

describe('Job', function(done) {

  it('if "visible" is not provided, it is false', function(done) {
    var job = new Job({
      jobtitle: 'foo',
      company: 'barcompany',
      website: 'website',
      location: 'moon',
      description: 'best jobs on the moon',
      howtoapply: 'send a pidgin!',
      date: new Date()
    });

    job.save(function(err, product) {
      if (err) {
        console.error(err);
      }
      expect(product.visible).to.equal(false);
      done();
    });
  });

  it('every job gets an id that is rising', function(done) {
    var c;
    Job.count({}, function(err, count) {
      c = count;
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

  describe('required fields', function(done) {
    it('validates required fields', function(done) {
      var job = new Job({s: ''});
      job.validate(function(err) {
        var errors = {
            howtoapply: {
              message: 'Validator "required" failed for path howtoapply',
              name: 'ValidatorError',
              path: 'howtoapply',
              type: 'required'
            },
            description: {
              message: 'Validator "required" failed for path description',
              name: 'ValidatorError',
              path: 'description',
              type: 'required'
            },
            location: {
              message: 'Validator "required" failed for path location',
              name: 'ValidatorError',
              path: 'location',
              type: 'required'
            },
            website: {
              message: 'Validator "required" failed for path website',
              name: 'ValidatorError',
              path: 'website',
              type: 'required'
            },
            company: {
              message: 'Validator "required" failed for path company',
              name: 'ValidatorError',
              path: 'company',
              type: 'required'
            },
            jobtitle: {
              message: 'Validator "required" failed for path jobtitle',
              name: 'ValidatorError',
              path: 'jobtitle',
              type: 'required'
            },
            date: {
              message: 'Validator "required" failed for path date',
              name: 'ValidatorError',
              path: 'date',
              type: 'required'
            }
        };
        expect(err.errors).to.eql(errors);
        done();
      });
    });
  });
});
