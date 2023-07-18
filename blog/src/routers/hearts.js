const express = require('express');
const router = express.Router();

const heartsController = require('../app/controllers/HeartsController');

router.use('/slug', heartsController.show);
router.use('/', heartsController.index);


module.exports = router;