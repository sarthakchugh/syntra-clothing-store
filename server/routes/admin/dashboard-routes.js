const express = require('express');
const {
	getMostOrderedProducts,
	getProductsWithLessStock,
	getSalesData,
	getCategoryOrders,
} = require('../../controllers/admin/dashboard-controller');
const router = express.Router();

router.get('/mostOrdered', getMostOrderedProducts);
router.get('/leastStock', getProductsWithLessStock);
router.get('/salesData', getSalesData);
router.get('/categoryOrdered', getCategoryOrders);

module.exports = router;
