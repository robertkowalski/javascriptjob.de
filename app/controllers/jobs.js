var mongoose = require('mongoose'),
    csrf = require('../helper/csrf'),
    getTweetText = require('../helper/getTweetText');

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
  var job = req.session.job;
  if (!job) {
    job = {
      jobtitle: '',
      company: '',
      website: '',
      location: '',
      description: '',
      howtoapply: ''
    }
  }

  res.render('jobs/new', {job: job});
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

  res.render('jobs/verify', {job: req.session.job, backlink: '/jobs/new', tweettext: ''});
};

exports.confirm = function(mailer) {

  return function(req, res) {
    var job = req.session.job,
        Job,
        val,
        mail;

    if (req.params.job != 'new') {
      res.send(501);
      return;
    }

    Job = mongoose.model('Job');
    job = new Job(job);

    job.validate(function(err) {
      if (err) {
        Object.keys(err.errors).forEach(function(key) {
          val = err.errors[key];
          req.flash('error', val.message);
        });
        res.redirect('jobs/new');
      } else {
        job.save(function(err) {
          if (err) {
            Object.keys(err.errors).forEach(function(key) {
              val = err.errors[key];
              req.flash('error', val.message);
            });
          } else {
            mail = mailer.createMail(job);
            mailer.sendMail(mail);
            res.render('jobs/confirmed');
          }
        });
      }
    });
  };
};

exports.show = function(req, res) {
  var Job = mongoose.model('Job'),
      findVisibleById = require('../helper/queries').findVisibleById;


  findVisibleById(Job, req.param('job'), function(err, job) {
    if (!job[0]) {
      res.status(404);
    }

    res.render('jobs/job', {job: job[0], tweettext: getTweetText(job[0])});
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