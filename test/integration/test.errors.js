var expect = require('chai').expect,
    request = require('request'),
    app = require('../../app'),
    queries = require('../../app/helper/queries'),
    querystring = require('querystring');

var helper = require('../helper');

describe('Custom Errorpages', function(done) {
  it('should contain a human readable error code', function(done) {

    request(helper.address + '/ThisWillNeverExist', function(err, res, body) {
      expect(body).to.contain('404');

      done();
    });
  });

  it('should contain a link to the index', function(done) {
    request(helper.address + '/ThisWillNeverExist', function(err, res, body) {
      expect(body).to.contain('<a href="/"');

      done();
    });
  });
});

describe('translated validation errors', function(done) {
  it('should be translated', function(done) {

    var data = {
      jobtitle: '',
      company: '',
      website: '',
      location: '',
      description: '',
      howtoapply: ''
    };

    request.post({
        uri: helper.address + '/jobs',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        body: querystring.stringify(data),
        followRedirect: true,
        maxRedirects: 10,
        followAllRedirects: true
        }, function(err, res, body) {

          expect(body).to.contain('Bitte geben Sie das Feld &quot;Wie bewerben&quot; an.');
          expect(body).to.contain('Bitte geben Sie eine Beschreibung an.');
          expect(body).to.contain('Bitte geben Sie einen Einsatzort an.');
          expect(body).to.contain('Bitte geben Sie eine Webseite an.');
          expect(body).to.contain('Bitte geben Sie ein Unternehmen an.');
          expect(body).to.contain('Bitte geben Sie eine Jobbezeichnung an.');

          done();
    });
  });
});