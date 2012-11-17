process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    mongoose = require('mongoose'),
    Job = mongoose.model('Job'),
    app = require('../../app');

require('../helper');

describe('Job', function(done) {

  describe('Job sanitizes its input', function(done) {

    it('sanitizes ALL the string-inputs', function(done) {
      var xssValues = {};

      Object.keys(Job.schema.paths).forEach(function(value) {
        if (Job.schema.paths[value].instance == 'String') {
          xssValues[value] = '<script>alert("You have to talk to mister banana");</script>';
        }
        xssValues.date = new Date()
      });

      var job = new Job(xssValues);
      job.save(function(err, job) {
        if (err) {
          console.error(err);
        }

        Object.keys(Job.schema.paths).forEach(function(value) {
          typeof job[value] == 'string' &&
            expect(job[value]).to.equal('[removed]alert&#40;"You have to talk to mister banana"&#41;;[removed]');
        });
        done();
      });
    });

    function createXssJob() {
      return new Job({
        jobtitle: '<script>alert(0);</script>',
        company: '<script>alert(1);</script>',
        website: '<script>alert(2);</script>',
        location: '<script>alert(3);</script>',
        description: '<script>alert("best job on the moon");</script>',
        howtoapply: '<script>alert("You have to talk to mister banana");</script>',
        date: new Date()
      });
    }

    it('field jobtitle: it sanitizes its input', function(done) {
      createXssJob().save(function(err, job) {
        if (err) {
          console.error(err);
        }
        expect(job.jobtitle).to.not.equal('<script>alert(0);</script>');
        done();
      });
    });

    it('field company: it sanitizes its input', function(done) {
      createXssJob().save(function(err, job) {
        if (err) {
          console.error(err);
        }
        expect(job.company).to.not.equal('<script>alert(1);</script>');
        done();
      });
    });

    it('field website: it sanitizes its input', function(done) {
      createXssJob().save(function(err, job) {
        if (err) {
          console.error(err);
        }
        expect(job.website).to.not.equal('<script>alert(2);</script>');
        done();
      });
    });

    it('field location: it sanitizes its input', function(done) {
      createXssJob().save(function(err, job) {
        if (err) {
          console.error(err);
        }
        expect(job.location).to.not.equal('<script>alert(3);</script>');
        done();
      });
    });

    it('field description: it sanitizes its input', function(done) {
      createXssJob().save(function(err, job) {
        if (err) {
          console.error(err);
        }
        expect(job.description).to.not.equal('<script>alert("best job on the moon");</script>');
        done();
      });
    });

    it('field howtoapply: it sanitizes its input', function(done) {
      createXssJob().save(function(err, job) {
        if (err) {
          console.error(err);
        }
        expect(job.howtoapply).to.not.equal('<script>alert("You have to talk to mister banana");</script>');
        done();
      });
    });
  });

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

    job.save(function(err, job) {
      if (err) {
        console.error(err);
      }
      expect(job.visible).to.equal(false);
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