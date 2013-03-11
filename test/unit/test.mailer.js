process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    mongoose = require('mongoose'),
    Job = mongoose.model('Job'),
    mailer = require('../../app/helper/mailer');

var helper = require('../helper');

var job = new Job({
  jobtitle: 'Developer',
  company: 'Frontend Corp.',
  website: 'website',
  location: 'moon',
  description: 'best jobs on the moon',
  howtoapply: 'send a pidgin!',
  date: new Date()
});

describe('helper/mailer/createMail', function() {

  it('sets the data from the job into the email', function() {
    var mail = mailer.createMail(job);

    expect(mail.subject).to.equal('jsjob.de: Ein neuer Job wurde gepostet');
    expect(mail.text).to.equal('Firma: Frontend Corp.\n\nJobtitel: Developer\n\n Webseite: website\n\n Location: moon\n\n Beschreibung: best jobs on the moon\n\n Wie bewerben: send a pidgin!');
  });

  it('gets the right environment variables from the config', function() {
    var mail = mailer.createMail(job);

    expect(mail.to).to.contain('mailto@example.org');
    expect(mail.from).to.equal('jsjob.de site <mail@example.org>');
  });
});