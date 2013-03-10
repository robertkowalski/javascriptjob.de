var env = process.env;

if (env.NODE_ENV == 'test') {
  require('./app/helper/mocking');
}

var express = require('express'),
    Resource = require('express-resource'),
    controllers = require('./app/controllers'),
    http = require('http'),
    path = require('path'),
    i18next = require('i18next'),
    flashify = require('flashify'),
    dateFormat = require('dateformat'),
    prettyDate = require('./app/helper/prettyDate'),
    RedisStore = require('connect-redis')(express),
    mailer = require('./app/helper/mailer');

i18next.init({
  lng: 'de-DE',
  ns: { namespaces: ['common'], defaultNs: 'common'},
  resGetPath: 'app/locales/__lng__/__ns__.json',
  debug: !env.NODE_ENV || env.NODE_ENV != 'production'
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

  app.use(require('stylus').middleware({
    src: __dirname + '/app/stylus',
    dest: __dirname + '/public',
    compress: app.get('env') == 'production',
    force: app.get('env') == 'development',
    firebug: app.get('env') == 'development',
    linenos: app.get('env') == 'development'
  }));

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.methodOverride());
  app.use(express.cookieParser(env.COOKIE_SECRET || 'lolcat'));

  if (app.get('env') == 'development' || app.get('env') == 'test') {
    app.locals.pretty = true;
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.session({store: new RedisStore({host: '127.0.0.1', port: 6379, maxAge: null}), secret: 'lolcat' }));
  }

  if (app.get('env') == 'production') {
    app.use(express.errorHandler());
    app.use(express.session({store: new RedisStore({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      pass: env.REDIS_AUTH,
      db: env.REDIS_DBNAME,
      maxAge: null
    }), secret: env.SESSION_SECRET }));

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
require('./db');

/* Routing */

// Middleware for resources
app.all('/*', function(req, res, next) {
   require('./app/helper/csrf')(req, res, next);
});

var jobs = app.resource('jobs', controllers.jobs);
jobs.map('get', 'verify', controllers.jobs.verify);
jobs.map('post', 'confirm', controllers.jobs.confirm(mailer));

app.get('/', controllers.jobs.index);
app.get('/impressum', controllers.impressum.index);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});