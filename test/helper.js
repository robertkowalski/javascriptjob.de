var mongoose = require('mongoose');

beforeEach(function(done) {
  var Job = mongoose.model('Job');
  Job.collection.drop();
  done();
});