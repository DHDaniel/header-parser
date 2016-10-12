// Request header microservice that returns:
// - User IP address
// - Browser language
// - Operating system

const express = require("express");
const ua = require("useragent");
var app = express();

// allowing Heroku to set up its own port
app.set("port", (process.env.PORT || 8080));

app.get("/api/whoami/", function (req, res) {

  var Agent = ua.parse(req.get("User-Agent"));

  var jsonRes = {
    ip : req.ip, // client IP
    lang : req.get("Accept-Language").split(",")[0], // getting only the first specified language
    os : Agent.os.toString() // getting the OS and version number
  }

  res.writeHeader(200, {
    "content-type" : "application/json"
  });

  res.end(JSON.stringify(jsonRes)); // responding


});

// This will route anything that was not previously matched.
app.use(function (req, res) {
  var myURL = req.protocol + "://" + req.get("host") + "/api/whoami/";
  res.end("To use this service, hit the API at " + myURL);
});

app.listen(app.get("port"), function () {
  console.log("Running on port " + app.get("port"));
});
