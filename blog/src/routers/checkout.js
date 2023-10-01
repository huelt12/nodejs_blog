const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');

const checkoutController = require('../app/controllers/CheckoutController');
const { Result } = require('express-validator');

router.get('/', checkoutController.index);

// Định nghĩa route cho việc đặt hàng
router.post('/place-order', checkoutController.placeOrder);

module.exports = router;


