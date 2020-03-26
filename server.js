var path = require("path");
var express = require("express");
const url = require("url");
const fs = require("fs");

var app = express();

/** whitelist origins */
const allowedOrigins = [
  "unizd.test.sistemi.hr",
  "business.omoguru.com",
  "omo-lab.herokuapp.com",
  "localhost:8080"
];

app.use((req, res, next) => {
  let host = req.get("host");
  allowedOrigins.includes(host)
    ? next()
    : res
        .status(401)
        .json(
          "401 - This domain is not listed as our partner. Please contact us at contact@omoguru.com"
        );
});

/** path for serving html pages only for heroku playground */
app.use(
  "/html",
  express.static(path.join(__dirname, "dist"), {
    setHeaders: function(res, path) {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
      res.set("Access-Control-Allow-Methods", "GET");
      res.set("X-Powered-By", " 3.2.1");
      res.type("text/html");
    }
  })
);

app.use(
  "/styles",
  express.static(path.join(__dirname, "dist"), {
    setHeaders: function(res, path) {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
      res.set("Access-Control-Allow-Methods", "GET");
      res.set("X-Powered-By", " 3.2.1");
      res.type("text/css");
    }
  })
);

app.use(
  "/webwidget",
  express.static(path.join(__dirname, "dist"), {
    setHeaders: function(res, path) {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
      res.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      res.set("X-Powered-By", " 3.2.1");
      res.type("application/json");
      res.type("json");
    }
  })
);

app.set("port", process.env.PORT || 8080);

var server = app.listen(app.get("port"), function() {
  console.log("listening on port ", server.address().port);
});
