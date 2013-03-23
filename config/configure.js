var env = process.env;

module.exports = function(app, express) {

var path = require('path'),
    i18next = require('i18next'),
    flashify = require('flashify'),
    dateFormat = require('dateformat'),
    RedisStore = require('connect-redis')(express),
    stylus = require('stylus'),
    nib = require('nib'),
    prettyDate = require('./../app/helper/prettyDate');

  i18next.init({
    lng: 'de-DE',
    ns: { namespaces: ['common'], defaultNs: 'common'},
    resGetPath: __dirname + '/../app/locales/__lng__/__ns__.json',
    debug: !env.NODE_ENV || env.NODE_ENV != 'production'
  });

  app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/../app/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(i18next.handle);

    function compile(str, path) {
     return stylus(str)
       .set('filename', path)
       .set('compress', true)
       .set('force', app.get('env') == 'development')
       .use(nib());
    }

    app.use(stylus.middleware({
      src: __dirname + '/../app/stylus',
      dest: __dirname + '/../public',
      compile: compile
    }));

    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.methodOverride());
    app.use(express.cookieParser(env.COOKIE_SECRET || 'lolcat'));

    if (app.get('env') == 'development' || app.get('env') == 'test') {
      app.locals.pretty = true;
      app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
      app.use(express.session({store: new RedisStore({host: '127.0.0.1', port: 6379, maxAge: null}), secret: 'lolcat' }));
    }

    if (app.get('env') == 'production') {
      app.use(express.errorHandler());

      var redis = new RedisStore({
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        pass: env.REDIS_AUTH,
        db: env.REDIS_DBNAME,
        maxAge: null
      });

      if (!redis.client.connected) {
        console.log('first redis host failed, trying a fallback...');

        redis = new RedisStore({
          host: env.REDIS_ALT_HOST,
          port: env.REDIS_ALT_PORT,
          pass: env.REDIS_ALT_AUTH,
          db: env.REDIS_DBNAME,
          maxAge: null
        });
      }

      app.use(express.session({store: redis, secret: env.SESSION_SECRET }));
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

  return app;
};