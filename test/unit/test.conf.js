process.env.NODE_ENV = 'test';

var expect = require('chai').expect,
    mongoose = require('mongoose'),
    Job = mongoose.model('Job'),
    config = require('../../app/helper/conf'),
    query;

var helper = require('../helper');

describe('helper/conf', function() {

  it('is a registry for environment variables', function() {
    expect(config.gmail_account).to.equal('mail@example.org');
    expect(config.gmail_password).to.equal('123');
    expect(config.mail_receiver).to.equal('mailto@example.org');
  });

});