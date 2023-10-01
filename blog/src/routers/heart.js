const express = require('express');
const router = express.Router();

const heartController = require('../app/controllers/HeartController');

router.get('/', heartController.index);
// router.get('/slug', heartController.show);


module.exports = router;  