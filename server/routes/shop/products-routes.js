const express = require('express');
const { getFilteredProducts, getProductDetails } = require('../../controllers/shop/products-controller');
const { authMiddleware } = require('../../controllers/auth/auth-controller');
const router = express.Router();

router.get('/', authMiddleware, getFilteredProducts);
router.get('/:id', authMiddleware, getProductDetails);

module.exports = router;
