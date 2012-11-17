
exports.findAllVisibleOrderedByDate = function(Job, cb) {

  Job
    .find({ visible: true })
    .sort('-date')
    .exec(cb);
};