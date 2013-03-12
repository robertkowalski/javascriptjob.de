var env = process.env;

if (env.NODE_ENV == 'test') {
  require('./test/mocking');
}

var express = require('express'),
    resource = require('express-resource'),
    http = require('http');

var app = module.exports = express();

/* app configure */
require('./config/configure')(app, express);

/* DB / Models */
require('./config/db');

/* Routing */
require('./config/routes')(app);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});