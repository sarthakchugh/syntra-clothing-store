const express = require('express');
const { searchProducts } = require('../../controllers/shop/search-controller');
const { authMiddleware } = require('../../controllers/auth/auth-controller');
const router = express.Router();

router.get('/:keyword', authMiddleware, searchProducts);

module.exports = router;
