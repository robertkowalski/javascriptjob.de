var app = require('../../app'),
    mongoose = require('mongoose'),
    sanitize = require('validator').sanitize;

var Schema,
    Job;

Schema = new mongoose.Schema({
  jobtitle: {type: String, required: true},
  company: {type: String, required: true},
  website: {type: String, required: true},
  location: {type: String, required: true},
  description: {type: String, required: true},
  howtoapply: {type: String, required: true},
  date: {type: Date, required: true},
  visible: {type: Boolean, default: false},
  id: {type: Number, required: true}
});

Schema.pre('validate', function(next) {
  var self = this;
  Job = mongoose.model('Job');

  Object.keys(Job.schema.paths).forEach(function(value) {
    if (self[value] && Job.schema.paths[value].instance == 'String') {
      self[value] = sanitize(self[value]).xss();
    }
  });

  Job.count({}, function(err, count) {
    self.id = count;
    next();
  });
});
module.exports = Schema;