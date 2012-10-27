var app = require('../../app'),
    mongoose = require('mongoose');

var db = mongoose.connect(app.get('mongoDb'));
var JobSchema,
    Job;

JobSchema = new mongoose.Schema({
  jobtitle: {type: String, required: true},
  company: {type: String, required: true},
  website: {type: String, required: true},
  location: {type: String, required: true},
  description: {type: String, required: true},
  howtoapply: {type: String, required: true},
  date: {type: Date, required: true},
  visible: {type: Boolean, required: true}
});

Job = db.model('Job', JobSchema);

module.exports = Job;