const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/gioi_thieu_ve_bookshop', siteController.gioithieu);
router.get('/search', siteController.search);
router.get('/', siteController.home);

    

module.exports = router;