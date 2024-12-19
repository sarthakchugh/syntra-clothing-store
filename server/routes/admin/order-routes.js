const express = require('express');
const { getAllOrders, updateOrderStatus } = require('../../controllers/admin/order-controller');
const { getOrderDetails } = require('../../controllers/shop/order-controller');
const { authMiddleware } = require('../../controllers/auth/auth-controller');
const router = express.Router();

router.get('/', authMiddleware, getAllOrders);
router.get('/:orderId', authMiddleware, getOrderDetails);
router.put('/:orderId', authMiddleware, updateOrderStatus);

module.exports = router;
