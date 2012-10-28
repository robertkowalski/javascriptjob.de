var mongoose = require('mongoose');

/*
GET    /jobs        #=> index
GET    /jobs/1      #=> show
GET    /jobs/new    #=> new
GET    /jobs/1/edit #=> edit
PUT    /jobs/1      #=> update
POST   /jobs        #=> create
DELETE /jobs/1      #=> destroy
*/

exports.index = function(req, res){
  res.send('forum index');
};

exports.new = function(req, res){
  res.render('jobs/new');
};

exports.create = function(req, res){
  var Job,
      job,
      val;

  Job = mongoose.model('Job');
  job = new Job({
    jobtitle: req.param('jobtitle'),
    company: req.param('company'),
    website: req.param('website'),
    location: req.param('location'),
    description: req.param('description'),
    howtoapply: req.param('howtoapply'),
    date: new Date()
  });

  job.validate(function(err) {
    if (err) {
      Object.keys(err.errors).forEach(function(key) {
        val = err.errors[key];
        req.flash(val.message);
      });

      res.render('jobs/new');
    } else {
      res.redirect('jobs/' + id)
    }
  });

  res.send('create forum');
};

exports.show = function(req, res){
  res.send('show forum ' + req.params.job);
};

exports.edit = function(req, res){
  res.send('edit forum ' + req.params.job);
};

exports.update = function(req, res){
  res.send('update forum ' + req.params.job);
};

exports.destroy = function(req, res){
  res.send('destroy forum ' + req.params.job);
};

exports.Jobs = { get: function(id, fn) {
  process.nextTick(function(){
    fn(null, { title: 'Ferrets' });
  });
}};