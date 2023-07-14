const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.use('/slug', cartController.show);
router.use('/', cartController.index);


module.exports = router;