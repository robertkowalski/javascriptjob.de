var express = require('express'),
    Resource = require('express-resource'),
    controllers = require('./app/controllers'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    i18next = require('i18next'),
    flashify = require('flashify');

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
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(flashify);
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
  app.locals.pretty = true;
  app.use(express.errorHandler());
  app.set('mongoDb', 'mongodb://localhost/jsjobstest');
});

app.configure('test', function() {
  app.locals.pretty = true;
  app.use(express.errorHandler());
  app.set('mongoDb', 'mongodb://localhost/jsjobstest');
});

/* DB / Models */
if (!mongoose.connection.db) {
  var db = mongoose.connect(app.get('mongoDb'));
  db.model('Job', require('./app/models/job'));
}

/* Routing */
app.resource('jobs', controllers.jobs);
app.get('/', controllers.jobs.index);


http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
