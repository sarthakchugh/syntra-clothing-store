const express = require('express');
const {
    getMostOrderedProducts,
    getProductsWithLessStock,
    getSalesData,
    getCategoryOrders,
} = require('../../controllers/admin/dashboard-controller');
const { authMiddleware } = require('../../controllers/auth/auth-controller');
const router = express.Router();

router.get('/mostOrdered', authMiddleware, getMostOrderedProducts);
router.get('/leastStock', authMiddleware, getProductsWithLessStock);
router.get('/salesData', authMiddleware, getSalesData);
router.get('/categoryOrdered', authMiddleware, getCategoryOrders);

module.exports = router;
