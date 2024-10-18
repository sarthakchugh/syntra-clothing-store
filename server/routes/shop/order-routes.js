const express = require('express');
const {
	createOrder,
	capturePayment,
	getAllOrders,
	getOrderDetails,
	cancelOrder,
} = require('../../controllers/shop/order-controller');
const router = express.Router();

router.post('/add', createOrder);
router.post('/payment', capturePayment);
router.get('/user/:userId', getAllOrders);
router.get('/:orderId', getOrderDetails);
router.put('/:orderId', cancelOrder);

module.exports = router;
