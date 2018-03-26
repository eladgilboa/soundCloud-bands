
var winston = require('winston');
var db = require('./db');
var Transport = require('winston-transport');
var util = require('util');

class MongoDB extends Transport {
  constructor(opts) {
    super(opts);
    this.db = opts.db;
  }

  log(info, callback) {
    var collectionName = info.level === 'error' ? 'error' : 'result';
    this.db.get().collection(collectionName).insertOne(info,function(err, res){
      if (err)
        throw err;
    });
  }
};

var options = {
  db : db
};

var logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new MongoDB(options)
  ]
});

module.exports = logger;
