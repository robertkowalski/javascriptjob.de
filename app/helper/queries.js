var sanitize = require('validator').sanitize

exports.findAllVisibleOrderedByDate = function(Model, cb) {
  Model
    .find({ visible: true })
    .sort('-date')
    .exec(cb);
};

exports.findVisibleById = function(Model, id, cb) {
  Model
    .find({
      visible: true,
      id: id
    })
    .exec(cb);
};