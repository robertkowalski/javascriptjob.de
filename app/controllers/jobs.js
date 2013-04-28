var mongoose = require('mongoose'),
    csrf = require('../helper/csrf'),
    getTweetText = require('../helper/getTweetText'),
    text = require('../locales/de-DE/common.json'),
    t = require('../helper/translation')(text),
    AsyncCache = require('async-cache'),
    Job = mongoose.model('Job'),
    findAllVisibleOrderedByDate = require('../helper/queries').findAllVisibleOrderedByDate,
    jobs;

/*
GET    /jobs        #=> index
GET    /jobs/1      #=> show
GET    /jobs/new    #=> new
GET    /jobs/1/edit #=> edit
PUT    /jobs/1      #=> update
POST   /jobs        #=> create
DELETE /jobs/1      #=> destroy
*/

/* an async LRU-Cache storing the jobs on the index page */
exports.lru = jobs = new AsyncCache({
  max: 1000,
  maxAge: (1000 * 60) * 8,
  load: function (key, cb) {
    findAllVisibleOrderedByDate(Job, function(err, jobs) {
      cb(err, jobs);
    });
  }
});

exports.index = function(req, res) {
  jobs.get('jobsByDate', function (err, jobs) {

    if (req.route.params.format == 'json') {
      return res.json(jobs);
    }

    return res.render('index', {joblist: jobs});
  })
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
  var format = req.route.params.format,
      job,
      val;

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
    if (format == 'json') {
      if (err) {
        res.status(400);
        return res.json({status: 'error', action: 'validate'});
      } else {
        job.save(function(err) {
          if (err) {
            res.status(400);
            return res.json({status: 'error', action: 'save'});
          } else {
            return res.json({status: 'ok'});
          }
        });
      }
    } else {
      if (err) {
        Object.keys(err.errors).forEach(function(key) {
          val = err.errors[key];
          req.flash('error', t(val.message));
        });

        res.redirect('jobs/new');
      } else {
        req.session.job = job;
        res.redirect('jobs/new/verify');
      }
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
        val,
        mail;

    if (req.params.job != 'new') {
      res.send(501);
      return;
    }

    job = new Job(job);

    job.validate(function(err) {
      if (err) {
        Object.keys(err.errors).forEach(function(key) {
          val = err.errors[key];
          req.flash('error', val.message);
        });
        res.redirect('jobs/new');
      } else {
        job.visible = false;
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
  var findVisibleById = require('../helper/queries').findVisibleById;


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