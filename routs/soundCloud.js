var express = require('express');
var router = express.Router();
var checkSecretKey = require('../middlewares/secretKey');
var soundCloud_controller  = require('../controllers/soundCloud_controller');


router.use(checkSecretKey);

router.post('/likesExtremum', soundCloud_controller.getLikesExtremum);

router.post('/bandsComparison', soundCloud_controller.bandsComparison);

module.exports = router;