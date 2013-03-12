var mockery = require('mockery');
  mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false
});

var mailerMock = {
  sendMail: function() {
  },
  createMail: function() {
  }
};

mockery.registerMock('./../app/helper/mailer', mailerMock);