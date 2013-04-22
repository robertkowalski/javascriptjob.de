require('../../config/db');

var expect = require('chai').expect,
    mongoose = require('mongoose'),
    Job = mongoose.model('Job');

require('../helper');

describe('Job', function(done) {

  describe('Bad html (head, body, html-tag) in user input', function(done) {

    it('sanitizes a body tag', function(done) {
      var job = new Job({
        jobtitle: '<html><body><head></head></body></html>',
        company: '<html><body><head></head></body></html>',
        website: '<html><body><head></head></body></html>',
        location: '<html><body><head></head></body></html>',
        description: '<html><body><head></head></body></html>',
        howtoapply: '<html><body><head></head></body></html>',
        date: new Date()
      });

      job.save(function(err, job) {
        if (err) {
          console.error(err);
        }
        expect(job.jobtitle).to.equal('&lt;html&gt;&lt;body>&lt;head&gt;&lt;/head>&lt;/body&gt;&lt;/html>');
        expect(job.company).to.equal('&lt;html&gt;&lt;body>&lt;head&gt;&lt;/head>&lt;/body&gt;&lt;/html>');
        expect(job.website).to.equal('&lt;html&gt;&lt;body>&lt;head&gt;&lt;/head>&lt;/body&gt;&lt;/html>');
        expect(job.location).to.equal('&lt;html&gt;&lt;body>&lt;head&gt;&lt;/head>&lt;/body&gt;&lt;/html>');
        expect(job.description).to.equal('&lt;html&gt;&lt;body>&lt;head&gt;&lt;/head>&lt;/body&gt;&lt;/html>');
        expect(job.howtoapply).to.equal('&lt;html&gt;&lt;body>&lt;head&gt;&lt;/head>&lt;/body&gt;&lt;/html>');

        done();
      });

    });

  });

  describe('Job and XSS', function(done) {

    it('sanitizes ALL the string-inputs', function(done) {
      var xssValues = {};

      Object.keys(Job.schema.paths).forEach(function(value) {
        if (Job.schema.paths[value].instance == 'String') {
          xssValues[value] = '<script>alert("You have to talk to mister banana");</script>';
        }
        xssValues.date = new Date();
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
        expect(job.jobtitle).to.equal('[removed]alert&#40;0&#41;;[removed]');
        expect(job.jobtitle).to.not.equal('<script>alert(0);</script>');
        done();
      });
    });

    it('field company: it sanitizes its input', function(done) {
      createXssJob().save(function(err, job) {
        if (err) {
          console.error(err);
        }
        expect(job.company).to.equal('[removed]alert&#40;1&#41;;[removed]');
        expect(job.company).to.not.equal('<script>alert(1);</script>');
        done();
      });
    });

    it('field website: it sanitizes its input', function(done) {
      createXssJob().save(function(err, job) {
        if (err) {
          console.error(err);
        }
        expect(job.website).to.equal('[removed]alert&#40;2&#41;;[removed]');
        expect(job.website).to.not.equal('<script>alert(2);</script>');
        done();
      });
    });

    it('field location: it sanitizes its input', function(done) {
      createXssJob().save(function(err, job) {
        if (err) {
          console.error(err);
        }
        expect(job.location).to.equal('[removed]alert&#40;3&#41;;[removed]');
        expect(job.location).to.not.equal('<script>alert(3);</script>');
        done();
      });
    });

    it('field description: it sanitizes its input', function(done) {
      createXssJob().save(function(err, job) {
        if (err) {
          console.error(err);
        }
        expect(job.description).to.equal('[removed]alert&#40;"best job on the moon"&#41;;[removed]');
        expect(job.description).to.not.equal('<script>alert("best job on the moon");</script>');
        done();
      });
    });

    it('field howtoapply: it sanitizes its input', function(done) {
      createXssJob().save(function(err, job) {
        if (err) {
          console.error(err);
        }
        expect(job.howtoapply).to.equal('[removed]alert&#40;"You have to talk to mister banana"&#41;;[removed]');
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

  describe('required fields', function(done) {
    var job,
        error;

    before(function(done){
      job = new Job({s: ''});

      job.validate(function(err) {
        error = err;
        done();
      });

    });

    it('validates howtoapply', function() {
      expect(error.errors.howtoapply).to.deep.equal({
        message: 'Validator \"required\" failed for path howtoapply with value `undefined`',
        name: 'ValidatorError',
        path: 'howtoapply',
        type: 'required',
        value: undefined
      });
    });

    it('validates description', function() {
      expect(error.errors.description).to.deep.equal({
        message: 'Validator "required" failed for path description with value `undefined`',
        name: 'ValidatorError',
        path: 'description',
        type: 'required',
        value: undefined
      });
    });

    it('validates location', function() {
      expect(error.errors.location).to.deep.equal({
        message: 'Validator "required" failed for path location with value `undefined`',
        name: 'ValidatorError',
        path: 'location',
        type: 'required',
        value: undefined
      });
    });

    it('validates website', function() {
      expect(error.errors.website).to.deep.equal({
        message: 'Validator "required" failed for path website with value `undefined`',
        name: 'ValidatorError',
        path: 'website',
        type: 'required',
        value: undefined
      });
    });

    it('validates company', function() {
      expect(error.errors.company).to.deep.equal({
        message: 'Validator "required" failed for path company with value `undefined`',
        name: 'ValidatorError',
        path: 'company',
        type: 'required',
        value: undefined
      });
    });

    it('validates website', function() {
      expect(error.errors.jobtitle).to.deep.equal({
        message: 'Validator "required" failed for path jobtitle with value `undefined`',
        name: 'ValidatorError',
        path: 'jobtitle',
        type: 'required',
        value: undefined
      });
    });

    it('validates date', function() {
      expect(error.errors.date).to.deep.equal({
        message: 'Validator "required" failed for path date with value `undefined`',
        name: 'ValidatorError',
        path: 'date',
        type: 'required',
        value: undefined
      });
    });
  });
});
