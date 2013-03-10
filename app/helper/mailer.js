var nodemailer = require('nodemailer'),
    env = process.env;

exports.createMail = function(job) {

  return {
    // sender info
    from: 'jsjob.de site <' + env.GMAIL_ACCOUNT + '>',

    // Comma separated list of recipients
    to: '"Admin jsjob.de" <' + env.MAIL_RECEIVER + '>',

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
      user: env.GMAIL_ACCOUNT,
      pass: env.GMAIL_PASSWORD
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
