var mongoose = require('mongoose');


beforeEach(function(done) {
  var Job = mongoose.model('Job');
  Job.collection.drop();

  done();
});

exports.address = 'http://127.0.0.1:3000';