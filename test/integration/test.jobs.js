var expect = require('chai').expect,
    request = require('request'),
    app = require('../../app'),
    queries = require('../../app/helper/queries'),
    querystring = require('querystring');

var helper = require('../helper');

describe('Creation of Jobs', function(done) {
  it('should show flash error messages when invalid data is submitted', function(done) {

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
            expect(body).to.contain('<div id="messages"');
            expect(body).to.contain('<ul class="error"');
            done();
      });
  });
});

describe('Listing of 3 Jobs - 2 visible', function(done) {
  var query;

  beforeEach(function(done) {
    helper = require('../helper');
    helper.createThreeJobs(done);
  });

  it('both visible jobs', function(done) {
      request(helper.address + '/jobs', function(err, res, body) {
        expect(body).to.contain('Foo');
        expect(body).to.contain('Jimdo GmbH');

        expect(body).to.contain('München');
        expect(body).to.contain('Hamburg');

        expect(body).to.contain('Node.js Developer - Backend');
        expect(body).to.contain('Endgegner gesucht');

        done();
      });
  });
});

describe('Detaillisting of Jobs', function(done) {
  beforeEach(function(done) {
    helper = require('../helper');
    helper.createThreeJobs(done);
  });

  it('both visible jobs', function(done) {
      request(helper.address + '/jobs/2', function(err, res, body) {
        expect(body).to.contain('Foo Inc.');
        expect(body).to.contain('moon');
        expect(body).to.contain('Node.js Developer - Backend');

        done();
      });
  });
});

describe('Verifying a job', function(done) {

  beforeEach(function(done) {
    helper = require('../helper');
    done();
  });

  it('after posting a valid job one should verify the input', function(done) {

    var data = {
      jobtitle: 'foo1',
      company: 'barme1',
      website: 'websity1',
      location: 'locaty1',
      description: 'descripty1',
      howtoapply: 'howtoapplyy1'
    };

    request.post({
        uri: helper.address + '/jobs',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        body: querystring.stringify(data),
        followRedirect: true,
        maxRedirects: 10,
        followAllRedirects: true
        }, function(err, res, body) {
          expect(body).to.contain('foo1');
          expect(body).to.contain('barme1');
          expect(body).to.contain('websity1');
          expect(body).to.contain('locaty1');
          expect(body).to.contain('descripty1');
          expect(body).to.contain('howtoapplyy1');

          done();
    });
  });


  it('should show the entered data after clicking back on the screen where I validate the data', function(done) {

    var data = {
      jobtitle: 'foomysss',
      company: 'barme',
      website: 'websity',
      location: 'locaty',
      description: 'descripty',
      howtoapply: 'howtoapplyy'
    };

    request.post({
        uri: helper.address + '/jobs',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        body: querystring.stringify(data),
        followRedirect: true,
        maxRedirects: 10,
        followAllRedirects: true
        }, function(err, res, body) {
          expect(body).to.contain('foomysss');
          expect(body).to.contain('barme');
          expect(body).to.contain('websity');
          expect(body).to.contain('locaty');
          expect(body).to.contain('descripty');
          expect(body).to.contain('howtoapplyy');
          done();
    });
  });

  it('should prevent XSS where I validate the data', function(done) {

    var data = {
      jobtitle: '<script>alert(0);</script>',
      company: 'barme3',
      website: 'websity3',
      location: 'locaty3',
      description: 'descripty3',
      howtoapply: 'howtoapplyy3'
    };

    request.post({
        uri: helper.address + '/jobs',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        body: querystring.stringify(data),
        followRedirect: true,
        maxRedirects: 10,
        followAllRedirects: true
        }, function(err, res, body) {
          expect(body).to.contain('alert&#40;0&#41;;');
          expect(body).to.contain('barme');
          expect(body).to.contain('websity');
          expect(body).to.contain('locaty');
          expect(body).to.contain('descripty');
          expect(body).to.contain('howtoapplyy');
          done();
    });
  });

});
