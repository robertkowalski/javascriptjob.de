var env = process.env,
    mongoose = require('mongoose');

var db,
    url;

if (env.NODE_ENV == 'production') {
  url = 'mongodb://' + env.MONGO_USER + ':' + env.MONGO_PW + '@' + env.MONGO_HOST + ':' + env.MONGO_PORT + '/' + env.MONGO_DBNAME;
} else {
  url = 'mongodb://localhost/jsjobstest'; // test, development...
}

if (!mongoose.connection.db) {
  db = mongoose.connect(url);
  db.model('Counter', require('./../app/models/counter'));
  db.model('Job', require('./../app/models/job'));
}
