const express = require('express');
const { getReviews, addReview } = require('../../controllers/shop/review-controller');
const { authMiddleware } = require('../../controllers/auth/auth-controller');
const router = express.Router();

router.get('/:productId', authMiddleware, getReviews);
router.post('/add', authMiddleware, addReview);

module.exports = router;
