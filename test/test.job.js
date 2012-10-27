process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    Job = require('../app/models/job'),
    app = require('../app');

describe('Job', function(done) {

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
            visible: {
              message: 'Validator "required" failed for path visible',
              name: 'ValidatorError',
              path: 'visible',
              type: 'required'
            },
            date: {
              message: 'Validator "required" failed for path date',
              name: 'ValidatorError',
              path: 'date',
              type: 'required'
            },
        };
        expect(err.errors).to.eql(errors);
        done();
      });
    });
  });
});
