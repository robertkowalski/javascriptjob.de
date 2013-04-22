var env = process.env;

module.exports = function(app, express) {

var path = require('path'),
    flashify = require('flashify'),
    dateFormat = require('dateformat'),
    RedisStore = require('connect-redis')(express),
    stylus = require('stylus'),
    nib = require('nib'),
    prettyDate = require('./../app/helper/prettyDate'),
    multiRedis = require('connect-multi-redis'),
    isOld = require('./../app/helper/isOld'),
    options;

    if (app.get('env') == 'production') {
      options = {
        hosts: [
          new RedisStore({
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
            pass: env.REDIS_AUTH,
            db: env.REDIS_DBNAME,
            maxAge: null
          }),
          new RedisStore({
            host: env.REDIS_ALT_HOST,
            port: env.REDIS_ALT_PORT,
            pass: env.REDIS_ALT_AUTH,
            db: env.REDIS_DBNAME,
            maxAge: null
          })
        ],
        session_secret: env.SESSION_SECRET
      };
    } else {
      options = {
        hosts: [
          new RedisStore({ host: '127.0.0.1', port: 6379, maxAge: null })
        ],
        session_secret: 'lolcat'
      };
    }

  multiRedis = multiRedis(app, express.session);

  app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/../app/views');
    app.set('view engine', 'jade');
    app.disable('x-powered-by');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(multiRedis(options));

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
      app.use(express.session({ store: options.hosts[0], secret: 'lolcat' }));
    }

    if (app.get('env') == 'production') {
      app.use(express.errorHandler());

      app.use(express.session({ store: options.hosts[0], secret: env.SESSION_SECRET }));
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

    app.use(function(req, res, next) {
      res.locals.isOld = function(date) {
        return isOld(date);
      };
      next();
    });

    app.use(flashify);
    app.use(app.router);

    app.use(function(err, req, res, next) {
      if (err.status === 403) {
        res.status(403);
        res.render('error', {error: '403 error'});
      } else if (err) {
        res.status(500);
        res.render('error', {error: '500 error'});
      }
    });

    app.use(function(req, res, next) {
      res.status(404);
      res.render('error', {error: '404 error'});
    });

  });

  return app;
};