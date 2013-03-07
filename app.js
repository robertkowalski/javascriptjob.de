var express = require('express'),
    Resource = require('express-resource'),
    controllers = require('./app/controllers'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    i18next = require('i18next'),
    flashify = require('flashify'),
    dateFormat = require('dateformat'),
    prettyDate = require('./app/helper/prettyDate'),
    RedisStore = require('connect-redis')(express);

var debug = !process.env.NODE_ENV || process.env.NODE_ENV != 'production';

i18next.init({
  lng: 'de-DE',
  ns: { namespaces: ['common'], defaultNs: 'common'},
  resGetPath: 'app/locales/__lng__/__ns__.json',
  debug: debug
});

var app = module.exports = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(i18next.handle);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));

  if (app.get('env') == 'development' || app.get('env') == 'test') {
    app.locals.pretty = true;
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.set('mongoDb', 'mongodb://localhost/jsjobstest');
    app.use(express.session({store: new RedisStore({host:'127.0.0.1', port: 6379}), secret: 'lolcat' }));
  }

  if (app.get('env') == 'production') {
    app.use(express.errorHandler());
    app.use(express.session({store: new RedisStore({host:'127.0.0.1', port: 6379}), secret: 'lolcat' }));
    app.set('mongoDb', 'mongodb://localhost/jsjobstest');

    app.use(express.csrf());
  }

  app.use(function(req, res, next) {
    res.locals.prettyDate = function(date) {
      return prettyDate(date);
    };
    next();
  });

  app.use(function(req, res, next) {
    res.locals.formatDate = function(date) {
      return dateFormat(date, 'dd.mm.yyyy');
    };
    next();
  });

  app.use(flashify);
  app.use(app.router);


  app.use(function(err, req, res, next) {
    if (err.status !== 403) {
      return next();
    }
    res.status(403);
    res.render('error', {error: '403 error'});
  });

  app.use(function(err, req, res, next) {
    res.status(500);
    res.render('error', {error: '500 error'});
  });

  app.use(function(req, res, next) {
    res.status(404);
    res.render('error', {error: '404 error'});
  });

});


i18next.registerAppHelper(app);

i18next.serveWebTranslate(app, {
  i18nextWTOptions: {
    languages: ['de-DE'],
    namespaces: ['common'],
    dynamicLoad: false
  }
});


/* DB / Models */
if (!mongoose.connection.db) {
  var db = mongoose.connect(app.get('mongoDb'));
  db.model('Job', require('./app/models/job'));
}



/* Routing */

// Middleware for resources
app.all('/*', function(req, res, next) {
   require('./app/helper/csrf')(req, res, next);
});

var jobs = app.resource('jobs', controllers.jobs);
jobs.map('get', 'verify', controllers.jobs.verify);
jobs.map('post', 'confirm', controllers.jobs.confirm);

app.get('/', controllers.jobs.index);
app.get('/impressum', controllers.impressum.index);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});