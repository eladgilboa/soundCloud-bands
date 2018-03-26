var express = require('express');
var app = express();
var soundCloud = require('./routs/soundCloud');
var config = require('./config/default.json');
var bodyParser = require('body-parser');
var db = require('./db');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/soundCloud', soundCloud);

db.connect( config.db.uri, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    app.listen( config.port , function() {
      console.log('listening on port: ',config.port);
    })
  }
});

module.exports = app;