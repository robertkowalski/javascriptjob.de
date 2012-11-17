var sanitize = require('validator').sanitize

exports.findAllVisibleOrderedByDate = function(Job, cb) {
  Job
    .find({ visible: true })
    .sort('-date')
    .exec(cb);
};

exports.findVisibleJobById = function(id, Job, cb) {
  console.log(id);
  Job
    .find({
      visible: true,
      id: id
    })
    .exec(cb);
};