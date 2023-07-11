const express = require('express');
const router = express.Router();

const detailController = require('../app/controllers/DetailController');

router.use('/slug', detailController.show);
router.use('/', detailController.index);


module.exports = router;