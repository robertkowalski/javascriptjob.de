var nodemailer = require('nodemailer'),
    config = require('./conf');

exports.createMail = function(job) {

  return {
    // sender info
    from: 'jsjob.de site <' + config.gmail_account + '>',

    // Comma separated list of recipients
    to: '"Admin jsjob.de" <' + config.mail_receiver + '>',

    // Subject of the message
    subject: 'jsjob.de: Ein neuer Job wurde gepostet',

    // plaintext body
    text: 'Firma: ' + job.company + '\n\nJobtitel: ' + job.jobtitle + '\n\n Webseite: ' + job.website + '\n\n Location: ' + job.location + '\n\n Beschreibung: ' + job.description + '\n\n Wie bewerben: ' + job.howtoapply,

    // An array of attachments
    attachments:[

    ]
  };
};

exports.sendMail = function(mail) {


  // Create a SMTP transport object
  var transport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: config.gmail_account,
      pass: config.gmail_password
    }
  });

  console.log('Sending Mail');
  transport.sendMail(mail, function(error){
    if (error){
      console.log('Error occured');
      console.log(error.message);
      return;
    }
    console.log('Message sent successfully!');

    transport.close(); // close the connection pool
  });

};
