var child_process = require("child_process");

exports.setup = function (config, on, off, cb) {
  var telegram = child_process.spawn(config.bin, ["-k", config.key, "-R", "-C"]);
  var tg_buffer = "";
  telegram.stdout.on("data", function(data) {
    tg_buffer += data;
    if (tg_buffer.indexOf("\n") !== -1) {
      if (tg_buffer.indexOf(">>>") !== -1) {
        console.log("New message");
        on();
      }
      if (tg_buffer.indexOf(config.name + " online") !== -1) {
        console.log("Read message");
        off();
      }
      tg_buffer = "";
    }
  });
  cb(null);
};
