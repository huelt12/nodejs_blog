const express = require('express');
const router = express.Router();
const forgetpassController = require('../app/controllers/ForgetpassController');

router.get('/', forgetpassController.showForgetpassPage);
router.post('/', forgetpassController.processForgetpassRequest);

module.exports = router;

