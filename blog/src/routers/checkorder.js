const express = require('express');
const router = express.Router();

const checkorderController = require('../app/controllers/CheckorderController');

router.get('/', checkorderController.showOrder);
router.get('/user-orders', checkorderController.getAllOrders);


module.exports = router;

   