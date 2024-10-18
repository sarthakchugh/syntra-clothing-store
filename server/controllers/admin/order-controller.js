const Order = require('../../models/Order');

const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find().sort({ createdAt: -1 });
		if (!orders) {
			return res.status(404).json({
				success: false,
				message: 'No orders found.',
			});
		}

		const orderData = orders.map((order) => ({
			orderId: order._id,
			date: order.createdAt,
			amount: order.amount,
			status: order.status,
		}));

		res.status(200).json({
			success: true,
			data: orderData,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to fetch orders',
		});
	}
};

const getOrderDetails = async (req, res) => {
	try {
		const { orderId } = req.params;
		if (!orderId) {
			return res.status(422).json({
				success: false,
				message: 'Order Id not provided',
			});
		}
		const order = await Order.findById(orderId);
		if (!order) {
			return res.status(404).json({
				success: false,
				message: 'No orders found.',
			});
		}

		return res.status(200).json({
			success: true,
			data: order,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to fetch order details.',
		});
	}
};

const updateOrderStatus = async (req, res) => {
	try {
		const { orderId } = req.params;
		const { status } = req.body;
		if (!orderId) {
			return res.status(422).json({
				success: false,
				message: 'Order Id not provided',
			});
		}

		if (!status || status.trim() === '') {
			return res.status(422).json({
				success: false,
				message: 'Invalid status',
			});
		}

		const order = await Order.findById(orderId);
		order.status = status;
		await order.save();

		res.status(200).json({
			success: true,
			message: 'Order updated.',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to update order status.',
		});
	}
};

module.exports = { getAllOrders, getOrderDetails, updateOrderStatus };
