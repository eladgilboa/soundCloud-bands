var soundCloudServices = require('../services/soundCloud');
var logger = require('../logger');
var moment = require('moment-timezone');

exports.getLikesExtremum = function(req, res) {
  if( !req.body.band_name || req.body.band_name === ''){
    res.sendStatus(400).end();
  }
  soundCloudServices.getLikesExtremum(req.body.band_name)
    .then(function (response) {
      if(response.length === 0){
        logger.log(getErrorMsg(req.body.band_name,'band can not be found'));
        res.send('band can not be found');
        return;
      }
      logger.log({
        level: 'info',
        message: {
          time : moment().tz("Asia/Jerusalem").format('HH:mm DD/MM/YYYY'),
          band_name: req.body.band_name,
          result : response
        }
      });
      res.json(response);
    })
    .catch(function (error) {
      logger.log(getErrorMsg(req.body.band_name,error));
      res.sendStatus(503).end();
    });
};

exports.bandsComparison = function(req, res) {

  soundCloudServices.bandsComparison(req.body.bands)
    .then(function (response) {
      logger.log({
        level: 'info',
        message: {
          time : moment().tz("Asia/Jerusalem").format('HH:mm DD/MM/YYYY'),
          band_name: 'bandsComparison',
          result : response
        }
      });
      res.json(response);
    })
    .catch(function (error) {
      logger.log(getErrorMsg('bandsComparison',error));
      res.send(503).end();
    });
};

var getErrorMsg = function(band_name,error){
  return {
    level: 'error',
    message: {
      time : moment().tz("Asia/Jerusalem").format('HH:mm DD/MM/yyyy'),
      band_name: band_name,
      error : error
    }
  }
};

