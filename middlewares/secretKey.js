const config = require('../config/default.json');

const checkSecretKey = function(req, res, next) {
  console.log(req.body);
  if (req.body.secret_key === config.secretKey) {
    next()
  } else {
    res.status(401).end()
  }
};

module.exports = checkSecretKey;