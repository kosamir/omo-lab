var path = require("path");
var express = require("express");

var app = express();

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
