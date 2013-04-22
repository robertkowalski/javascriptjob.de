require('../../config/db');

var expect = require('chai').expect,
    mongoose = require('mongoose'),
    Job = mongoose.model('Job'),
    Counter = mongoose.model('Counter'),
    text = require('../../app/locales/de-DE/common.json'),
    t = require('../../app/helper/translation')(text);

require('../helper');

describe('required fields', function(done) {
  var job,
      error;

  beforeEach(function(done) {
    job = new Job({
      jobtitle: '',
      company: '',
      website: '',
      location: '',
      description: '',
      howtoapply: ''
    });

    job.save(function(err) {
      error = err;
      done();
    });
  });

  it('should translate the validation errors', function() {
    expect(t(error.errors.description.message)).to.equal("Bitte geben Sie eine Beschreibung an.");
    expect(t(error.errors.location.message)).to.equal("Bitte geben Sie einen Einsatzort an.");
    expect(t(error.errors.website.message)).to.equal("Bitte geben Sie eine Webseite an.");
    expect(t(error.errors.company.message)).to.equal("Bitte geben Sie ein Unternehmen an.");
    expect(t(error.errors.jobtitle.message)).to.equal("Bitte geben Sie eine Jobbezeichnung an.");
    expect(t(error.errors.howtoapply.message)).to.equal("Bitte geben Sie das Feld \"Wie bewerben\" an.");
  });

});