var qs = require('querystring'),
    domains = require('../../package.json').domains

module.exports = function getTweetText(job) {

  var tweetText = qs.escape(job.company + ' sucht einen ' + job.jobtitle + ' - ' + 'http://' + domains[0] + '/jobs/' + job.id);

  return tweetText;
};