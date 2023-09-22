const express = require('express');
const router = express.Router();

const orderController = require('../app/controllers/OrderController');

//lấy tất cả đơn hàng
router.get('/', orderController.getAllOrders);

module.exports = router;