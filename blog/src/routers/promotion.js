const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const conn = mongoose.connection;


const promotionController = require('../app/controllers/PromotionController');


router.get('/:slug', promotionController.show);
router.get('/:_id/add_cart', promotionController.add_cart);
router.get('/', promotionController.promotion);

module.exports = router; 

