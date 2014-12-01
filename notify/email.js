var imap = require("imap");

exports.setup = function (config, on, off, cb) {
  function getEmail() {
    var email = new imap(config.email);

    email.once("ready", function() {
      email.status("INBOX", function(err, box) {
        if (err) throw(err);
        if (box.messages.unseen > 0) {
          console.log("New email");
          on();
        } else {
          off();
        }
        email.end();
      });
    });

    email.on("error", function (err) {
      //quietly cry
    });

    email.connect();
  }
  setInterval(getEmail, config.interval * 1000);
  cb();
  getEmail();

};
