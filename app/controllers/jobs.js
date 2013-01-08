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

exports.index = function(req, res) {
  var Job,
      query;

  Job = mongoose.model('Job');
  query = require('../helper/queries').findAllVisibleOrderedByDate;

  query(Job, function(err, jobs) {
    res.render('index', {joblist: jobs});
  });
};

exports.new = function(req, res) {
  res.render('jobs/new');
};

exports.create = function(req, res) {
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
        req.flash('error', val.message);
      });

      res.redirect('jobs/new');
    } else {
      /*
      job.save(function(err) {
        if (err) {
          Object.keys(err.errors).forEach(function(key) {
            val = err.errors[key];
            req.flash('error', val.message);
          });
        } else {
            res.redirect('jobs/' + job.id);
        }
      });
      */
      req.session.job = job;
      res.redirect('jobs/new/verify');
    }
  });
};

exports.verify = function(req, res) {
  if (req.params.job != 'new') {
    res.send(501);
    return;
  }

  res.render('jobs/verify', {job: req.session.job});
};

exports.confirm = function(req, res) {
  res.send(500);
};

exports.show = function(req, res) {
  var Job,
      findVisibleJobByIdQuery;

  Job = mongoose.model('Job');
  findVisibleJobByIdQuery = require('../helper/queries').findVisibleJobById;

  findVisibleJobByIdQuery(req.param('job'), Job, function(err, job) {
    res.render('jobs/job', {job: job[0]});
  });
};

exports.edit = function(req, res) {
  res.send(404);
};

exports.update = function(req, res) {
  res.send(405);
};

exports.destroy = function(req, res) {
  res.send(405);
};

exports.Jobs = {
  get: function(id, fn) {
    process.nextTick(function(){
      fn(null, { title: 'Ferrets' });
    });
  }
};