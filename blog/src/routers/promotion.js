const express = require('express');
const router = express.Router();

const promotionController = require('../app/controllers/PromotionController');

router.use('/slug', promotionController.show);
router.use('/', promotionController.index);


module.exports = router;