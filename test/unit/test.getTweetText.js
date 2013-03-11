require('../../db');

var expect = require('chai').expect,
    mongoose = require('mongoose'),
    Job = mongoose.model('Job'),
    getTweetText = require('../../app/helper/getTweetText'),
    qs = require('querystring');

var helper = require('../helper');

var job = new Job({
  jobtitle: 'Developer',
  company: 'Frontend Company',
  website: 'website',
  location: 'moon',
  description: 'best jobs on the moon',
  howtoapply: 'send a pidgin!',
  date: new Date()
});

describe('helper/mailer/getTweetText', function(done) {

  it('creates a Tweet with the url to the job and a nice text around', function(done) {
    job.save(function(err) {
      var tweet = getTweetText(job);
      expect(qs.unescape(tweet)).to.equal('Frontend Company sucht einen Developer - http://javascriptjob.de/jobs/1');
      expect(tweet).to.equal('Frontend%20Company%20sucht%20einen%20Developer%20-%20http%3A%2F%2Fjavascriptjob.de%2Fjobs%2F1');
      done();
    });
  });
});