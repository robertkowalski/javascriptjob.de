var express = require('express'),
    routes = require('./app/routes'),
    user = require('./app/routes/user'),
    http = require('http'),
    path = require('path');

var i18next = require('i18next');

var debug = !process.env.NODE_ENV || process.env.NODE_ENV != 'production';

i18next.init({
  lng: 'de-DE',
  ns: { namespaces: ['common'], defaultNs: 'common'},
  resGetPath: 'app/locales/__lng__/__ns__.json',
  debug: debug
}); // for options see i18next-node gh-page
var app = module.exports = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(i18next.handle);

  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

i18next.registerAppHelper(app);

i18next.serveWebTranslate(app, {
  i18nextWTOptions: {
    languages: ['de-DE'],
    namespaces: ['common'],
    dynamicLoad: false
  }
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.configure('test', function() {
  app.use(express.errorHandler());
  app.set('mongoDb', 'mongodb://localhost/jsjobstest');
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
