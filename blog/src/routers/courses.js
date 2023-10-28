const express = require('express');
const router = express.Router();


const courseController = require('../app/controllers/CourseController');

router.get('/:slug', courseController.show);
router.post('/:_id/review', courseController.saveReview);
router.get('/:_id/add_cart', courseController.add_cart);

module.exports = router; 