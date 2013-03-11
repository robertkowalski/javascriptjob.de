var mongoose = require('mongoose'),
    sanitize = require('validator').sanitize;

var JobSchema,
    CounterSchema = mongoose.model('Counter');

JobSchema = new mongoose.Schema({
  jobtitle: {type: String, required: true},
  company: {type: String, required: true},
  website: {type: String, required: true},
  location: {type: String, required: true},
  description: {type: String, required: true},
  howtoapply: {type: String, required: true},
  date: {type: Date, required: true},
  visible: {type: Boolean, default: false},
  id: {type: Number, unique: true}
});

JobSchema.path('id').index({unique: true});

JobSchema.pre('validate', function(next) {
  var self = this;
  Object.keys(self.schema.paths).forEach(function(value) {
    if (self[value] && self.schema.paths[value].instance == 'String') {
      self[value] = sanitize(self[value]).xss();
    }
  });

  next();
});

JobSchema.pre('save', function(next) {
  var self = this;

  CounterSchema.increment(CounterSchema.ID, function(err, counter) {
    self.id = counter.next;
    next();
  });
});

module.exports = JobSchema;