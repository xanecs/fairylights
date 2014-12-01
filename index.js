var express = require("express");
var serialport = require("serial-port-stream");
var async = require("async");

var config;

try {
  config = require("./config.js");
} catch(ex) {
  config = require("./config.example.js");
}

var stream = new serialport(config.lights.serial, {baudRate: 9600});

var statusTable = [];
var onReasons = [];

function updateLight() {
  onReasons = [];
  for( var key in statusTable ) {
    if (statusTable.hasOwnProperty(key)) {
      if (statusTable[key]) {
        onReasons.push(key)
      }
    }
  }
  if (onReasons.length > 0) {
    stream.write("1\n");
    console.log("Light turned on");
    onReasons.forEach(function (el) {
      console.log(" - " + el);
    });
  } else {
    stream.write("0\n");
    console.log("Light turned off");
  }
}

var notifiers = [];
config.notify.forEach(function (notify) {
  notifiers[notify.name] = require("./notify/" + notify.type + ".js").setup(
    notify.config,
    function on() {
      statusTable[notify.name] = true;
      updateLight();
    },
    function off() {
      statusTable[notify.name] = false;
      updateLight();
    },
    function cb() {
      console.log(notify.name + " set up");
    }
  )
});

var app = express();
app.engine("jade", require("jade").__express);
app.set("views", "./views");
app.set("view engine", "jade");

app.use(express.static(__dirname + "/static"));

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/status", function(req, res) {
  res.render("status", {lightOn: onReasons.length > 0, reasons: onReasons});
});

app.get("/on", function(req, res) {
  console.log("Manual on (Web)");
  statusTable["web"] = true;
  updateLight();
  res.redirect("/");
});

app.get("/off", function(req, res) {
  console.log("Manual off (Web)");
  statusTable["web"] = false;
  updateLight();
  stream.write("0\n");
  res.redirect("/");
});

app.listen(config.server.port, config.server.host);
console.log("Listening on port " + config.server.port);
