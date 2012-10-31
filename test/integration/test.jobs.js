process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    request = require('superagent'),
    app = require('../../app');


var helper = require('../helper');


describe('Creation of Jobs', function(done) {
    it('should show flash error messages when invalid data is submitted', function(done) {
      var user1 = request.agent();
      user1
        .post(helper.address + '/jobs')
        .send({
          jobtitle: '',
          company: '',
          website: '',
          location: '',
          description: '',
          howtoapply: ''
        })
        .end(function(res){
          expect(res.text).to.contain('<div id="messages"');
          expect(res.text).to.contain('<ul class="error"');
          done();
        });
    });

});

