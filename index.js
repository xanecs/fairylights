var express = require("express");
var serialport = require("serial-port-stream");
var imap = require("imap");
var child_process = require("child_process");
var config = require("config");


var stream = new serialport("/dev/tty.serial1", {baudRate: 9600});

function on() {
  stream.write("1\n");
}

function off() {
  stream.write("0\n");
}

/*
function getEmail() {
  var email = new imap(config.email);

  email.once("ready", function() {
    email.status("INBOX", function(err, box) {
      if (err) throw(err);
      console.log(box);
      if (box.messages.unseen > 0) {
        stream.write("1\n");
      } else {
        stream.write("0\n");
      }
      email.end();
    });
  });

  email.on("error", function (err) {
    console.log(err);
  });

  email.connect();
}*/

//getEmail();
//setInterval(getEmail, 60000);

var telegram = child_process.spawn(config.telegram.bin, ["-k", config.telegram.key, "-R", "-C"]);
var tg_buffer = "";
telegram.stdout.on("data", function(data) {
  tg_buffer += data;
  if (tg_buffer.indexOf("\n") !== -1) {
    if (tg_buffer.indexOf(">>>") !== -1) {
      console.log("New message");
      on();
    }
    if (tg_buffer.indexOf(config.telegram.name + " online") !== -1) {
      console.log("Read message");
      off();
    }
    tg_buffer = "";
  }
});

var app = express();
app.engine("jade", require("jade").__express);
app.set("views", "./views");
app.set("view engine", "jade");

app.use(express.static(__dirname + "/static"));

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/on", function(req, res) {
  console.log("Manual on (Web)");
  on();
  res.redirect("/");
});

app.get("/off", function(req, res) {
  console.log("Manual off (Web)");
  off();
  res.redirect("/");
});

app.listen(config.server.port, config.server.host);
console.log("Listening on port" + "config.server.port");
