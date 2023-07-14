const express = require('express');
const router = express.Router();

const checkoutController = require('../app/controllers/CheckoutController');

router.use('/slug', checkoutController.show);
router.use('/', checkoutController.index);


module.exports = router;