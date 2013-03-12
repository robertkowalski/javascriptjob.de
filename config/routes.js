var controllers = require('./../app/controllers'),
    mailer = require('./../app/helper/mailer'),
    csrf = require('./../app/helper/csrf');

module.exports = function(app) {
  // Middleware for resources
  app.all('/*', function(req, res, next) {
     csrf(req, res, next);
  });

  var jobs = app.resource('jobs', controllers.jobs);
  jobs.map('get', 'verify', controllers.jobs.verify);
  jobs.map('post', 'confirm', controllers.jobs.confirm(mailer));

  app.get('/', controllers.jobs.index);
  app.get('/impressum', controllers.impressum.index);

  return app;
};