const express = require('express');
const router = express.Router();

const reviewController = require('../app/controllers/ReviewController');

router.post('/add-review', reviewController.addReview); 

module.exports = router;
 