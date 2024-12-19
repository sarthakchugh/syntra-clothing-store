const express = require('express');
const {
    createOrder,
    capturePayment,
    getAllOrders,
    getOrderDetails,
    cancelOrder,
} = require('../../controllers/shop/order-controller');
const { authMiddleware } = require('../../controllers/auth/auth-controller');
const router = express.Router();

router.post('/add', authMiddleware, createOrder);
router.post('/payment', authMiddleware, capturePayment);
router.get('/user/:userId', authMiddleware, getAllOrders);
router.get('/:orderId', authMiddleware, getOrderDetails);
router.put('/:orderId', authMiddleware, cancelOrder);

module.exports = router;
