const express = require('express');
const { getAllOrders, updateOrderStatus } = require('../../controllers/admin/order-controller');
const { getOrderDetails } = require('../../controllers/shop/order-controller');
const router = express.Router();

router.get('/', getAllOrders);
router.get('/:orderId', getOrderDetails);
router.put('/:orderId', updateOrderStatus);

module.exports = router;
