const express = require('express');
const router = express.Router();

const heartController = require('../app/controllers/HeartController');

router.get('/', heartController.index);
router.get('/sach_yeu_thich_cua_toi', heartController.getAllhearts);

// Tạo tuyến đường để thêm sách vào data
router.post('/add_to_hearts', heartController.addToHeart);

module.exports = router;     