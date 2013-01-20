var mongoose = require('mongoose'),
    Job;


beforeEach(function(done) {
  var Job = mongoose.model('Job');
  Job.collection.drop();

  done();
});

exports.address = 'http://127.0.0.1:3000';

/* create2 jobs - 1 not visible, 2 visible */
exports.createThreeJobs = function(done) {

  Job = mongoose.model('Job');
  var job1 = new Job({
    jobtitle: 'Nicht sichtbarer Developer',
    company: 'Frontend Corp.',
    website: 'website',
    location: 'moon',
    description: 'best jobs on the moon',
    howtoapply: 'send a pidgin!',
    date: new Date()
  });

  job1.save(function(err, job) {
    if (err) {
      console.error(err);
    }
    var job2 = new Job({
      jobtitle: 'Node.js Developer - Backend',
      company: 'Foo Inc.',
      website: 'website',
      location: 'München',
      description: 'best jobs on the moon',
      howtoapply: 'send a pidgin!',
      date: new Date(1999, 10, 9),
      visible: true
    });

    job2.save(function(err, job) {
      if (err) {
        console.error(err);
      }
      var job3 = new Job({
        jobtitle: 'Frontend Developer',
        company: 'Frontend Corp.',
        website: 'website',
        location: 'Hamburg',
        description: 'best jobs on the moon',
        howtoapply: 'send a pidgin!',
        date: new Date(2002, 11, 10),
        visible: true
      });

      job3.save(function(err, job) {
        if (err) {
          console.error(err);
        }
        done();
      });
    });
  });

};