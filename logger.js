
var winston = require('winston');
//require('winston-mongodb');
var db = require('./db');
const Transport = require('winston-transport');
const util = require('util');

class MongoDB extends Transport {
  constructor(opts) {
    super(opts);
    this.db = opts.db;
  }

  log(info, callback) {
    var collectionName = info.level === 'error' ? 'error' : 'result';
    this.db.get().collection('collectionName').insertOne(info,function(err, res){
      if (err)
        throw err;
      console.log('insert: ', info);
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
