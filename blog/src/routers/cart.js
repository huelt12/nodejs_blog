const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.get('/gio_hang_cua_toi', cartController.getAllcarts);
router.post('/add_to_carts', cartController.addToCart);
router.get('/checkout', cartController.checkout);
router.delete('/:id', cartController.delete);
router.use('/slug', cartController.show);
router.get('/', cartController.index);

 
module.exports = router;  