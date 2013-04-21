var expect = require('chai').expect,
    request = require('request'),
    app = require('../../app'),
    queries = require('../../app/helper/queries'),
    helper = require('../helper');

describe('Index', function(done) {

  it('should link to Impressum', function(done) {
      request(helper.address + '/', function(err, res, body) {
        expect(body).to.contain('<a href="/impressum">Impressum</a>');

        done();
      });
  });

  // tests for 'new'-badges
  var badge = 'span class="badge badge-info">NEU';

  describe('jobs not older than 30 days', function(done) {

    beforeEach(function(done) {
      // drop all jobs, create one with the date NOW()
      helper = require('../helper');
      helper.createVisibleJobCreatedJustNow(done);
    });

    it('shows "neu" badges', function(done) {
      request(helper.address + '/', function(err, res, body) {
        expect(body).to.contain(badge);
        done();
      });
    });

  });

  describe('jobs younger than 30 days', function(done) {

    beforeEach(function(done) {
      // drop all jobs, create one with the date in 2007
      helper = require('../helper');
      helper.createVisibleJobWithHtmlInSomeYearsOld(done);
    });

    it('shows no "neu" badges', function(done) {
      request(helper.address + '/', function(err, res, body) {
        expect(body).to.not.contain(badge);
        done();
      });
    });
  });

});

