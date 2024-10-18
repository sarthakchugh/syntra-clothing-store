const express = require('express');
const { getReviews, addReview } = require('../../controllers/shop/review-controller');
const router = express.Router();

router.get('/:productId', getReviews);
router.post('/add', addReview);

module.exports = router;
