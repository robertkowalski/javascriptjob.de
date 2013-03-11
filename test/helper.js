var mongoose = require('mongoose'),
    Job = mongoose.model('Job'),
    Counter = mongoose.model('Counter');


beforeEach(function(done) {
  Job.collection.drop();
  Counter.collection.drop();

  done();
});

exports.address = 'http://127.0.0.1:3000';


/* create2 jobs - 1 not visible, 2 visible */
exports.createThreeJobs = function(done) {

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
      website: 'http://google.com',
      location: 'München',
      description: 'best jobs on the moon',
      howtoapply: 'send a pidgin!',
      date: new Date(),
      visible: true
    });

    job2.save(function(err, job) {
      if (err) {
        console.error(err);
      }

      var html = '<div><ul><li>Du hast wie <a href="http://blog.koehntopp.de/" target="_blank">Kris Köhntopp</a> oder <a href="https://www.xing.com/profile/Boris_Erdmann2" target="_blank">Boris Erdmann</a> das Internetquasi miterfunden?</li><li>Du könntest in einem Satz Sinn und Zweck von <a href="https://github.com/Jimdo/dropr" target="_blank">Dropr</a> erklären?</li><li>Du hast Lust auf ein schnelles und ein bisschen <a href="http://de.jimdo.com/über-jimdo/jimdo-team/">verrücktes Team</a>?</li><li>Du findest die <a href="http://de.jimdo.com/über-jimdo/top-10-gründe-als-developer-bei-jimdo-zu-arbeiten/">Top 10 Gründe als Developer</a> bei Jimdo zu arbeiten gut ;)</li></ul></div><h3>Über Jimdo</h3>';
      html += '<div class="n j-text"><p>Mit Jimdo bieten wir unseren Usern die Möglichkeit, auf einfachste Art eine eigene Webseite zu erstellen.<br><br>Die Stärken von Jimdo sind die leichte Bedienung (wir haben sogar begeisterte User, die jenseits der 70 Jahre sind), die hohe grafische Flexibilität (die Einbindung eines eigenen Designs istproblemlos möglich) sowie eine hochwertige Darstellung von Fotos, Videos und Texten. Nutzer aus aller Welt haben bereits über 4 Millionen Webseiten mit Jimdo gebaut – und wir freuen uns über dasexponentielle Wachstum.<br><strong>&nbsp;</strong></p><p>Wir sind ein <a href="http://de.jimdo.com/%C3%BCber-jimdo/jimdo-team/">motiviertes Team kluger Köpfe</a> und haben unglaublich viel Spaß dabei, unseren Usern den besten Service zu bieten. Jederist Experte in seinem Bereich und zusammen versuchen wir, immer das Bestmögliche zu erreichen. Die Arbeit in unserem jungen und schnell wachsenden Start-Up bietet dir alle Freiheiten undMöglichkeiten, deine Ideen und dich selbst zu verwirklichen! <a href="http://de.jimdo.com/%C3%BCber-jimdo/top-11-gr%C3%BCnde-bei-jimdo-zu-arbeiten/">Überzeug dich selbst, warum du dich bei Jimdobewerben solltest.</a><br>&nbsp;<br><strong>Die Stelle ist Vollzeit und in&nbsp;unserem Büro in Hamburg.</strong></p><p>&nbsp;</p></div>';
      html += '<div class="n j-header"><h3>Deine Aufgaben</h3></div><div class="n j-text"><ul><li>Konzeption und Prototyp-Entwicklung von Kern-Komponenten</li><li>Umsetzung von Software-Design und Code reviews</li><li>best practice Lösungen finden und kommunizieren</li><li>Analyse und Verbesserung der Effizienz, Skalierbarkeit und Stabilität der Applikation</li></ul><p>&nbsp;</p><p>&nbsp;</p></div>';
      html += '<div class="n j-header"><h3>Anforderungen</h3></div><div class="n j-text"><p>Am wichtigsten ist uns, dass du mit Herz und Hirn bei der Sache bist und wirklich Ahnung von dem hast was du tust.</p><ul><li>langjährige Erfahrungen mit Web-Anwendungen</li><li>Sehr gute Kenntnisse in mind. einer der Scriptsprachen: PHP, Python oder Ruby</li><li>von Vorteil sind Kenntnisse in Design Patterns und MVC</li><li>gute Kenntnisse von Netzwerk-Protokollen</li><li>Unix/Linux und Shells</li><li>Der Blick und Sinn für das "Große Ganze"</li><li>Erfahrungen im Bereich Skalierung und idealerweise verteilten Umgebungen</li><li>Du magst <a href="http://www.jimdo.com/info/open-source/" target="_blank">Open Source</a></li></ul></div>';

      var job3 = new Job({
        jobtitle: 'Endgegner gesucht - Kreuzung aus Boris Erdmann und Kris Köhntopp (m/w)',
        company: 'Jimdo GmbH',
        website: 'http://jimdo.com',
        location: 'Hamburg',
        description: html,
        howtoapply: 'Pages to the People? Bitte sende deine Unterlagen per E-Mail an fridtjof@jimdo.com. Dein Ansprechpartner ist Fridel.',
        date: new Date(2007, 11, 10),
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