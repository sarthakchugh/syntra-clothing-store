const paypal = require('../../util/paypal');
const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

const createOrder = async (req, res) => {
	try {
		const { userId, cartItems, addressInfo, amount } = req.body;

		const payment_json = {
			intent: 'sale',
			payer: {
				payment_method: 'paypal',
			},
			redirect_urls: {
				return_url: `${process.env.APP_URL}/shop/paypal/return`,
				cancel_url: `${process.env.APP_URL}/shop/payment/fail`,
			},
			transactions: [
				{
					item_list: {
						items: cartItems.map((item) => ({
							name: item.title,
							sku: item.productId,
							price: item.price,
							currency: 'USD',
							quantity: item.quantity,
						})),
					},
					amount: {
						currency: 'USD',
						total: amount,
					},
					description: 'Order',
				},
			],
		};

		paypal.payment.create(payment_json, async (error, paymentInfo) => {
			if (error) {
				console.log(error);
				return res.status(500).json({
					success: false,
					message: 'Payment failed.',
				});
			} else {
				const newOrder = new Order({
					userId,
					cartItems,
					addressInfo,
					status: 'pending',
					paymentMethod: 'paypal',
					paymentStatus: 'pending',
					amount,
					payerId: '',
					paymentId: '',
				});

				await newOrder.save();

				const approvalURL = paymentInfo.links.find((link) => link.rel === 'approval_url').href;
				res.status(201).json({
					success: true,
					approvalURL,
					data: newOrder._id,
				});
			}
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Failed to create order.',
		});
	}
};

const capturePayment = async (req, res) => {
	try {
		const { paymentId, payerId, orderId } = req.body;
		let order = await Order.findById(orderId).populate({
			path: 'userId',
			select: 'username',
		});
		if (!order) {
			return res.status(404).json({
				success: false,
				message: 'No order found.',
			});
		}

		for (let item of order.cartItems) {
			let product = await Product.findById(item.productId);
			if (!product) {
				return res.status(404).json({
					success: false,
					message: `Failed to find ${product.title} in warehouse.`,
				});
			}

			product.totalStock -= item.quantity;
			await product.save();
		}

		order.paymentStatus = 'paid';
		order.status = 'confirmed';
		order.paymentId = paymentId;
		order.payerId = payerId;

		await order.save();

		const userId = order.userId;
		console.log(userId);
		const cart = await Cart.findOne({ user: userId });
		console.log(cart);
		cart.items = [];
		await cart.save();

		res.status(200).json({
			success: true,
			message: 'Order confirmed',
			data: order,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Failed to process payment.',
		});
	}
};

const getAllOrders = async (req, res) => {
	try {
		const { userId } = req.params;
		if (!userId) {
			return res.status(422).json({
				success: false,
				message: 'User Id not provided.',
			});
		}

		const orders = await Order.find({ userId }).sort({ createdAt: -1 });
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
		const order = await Order.findById(orderId).populate({
			path: 'userId',
			select: 'username',
		});
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

const cancelOrder = async (req, res) => {
	try {
		const { orderId } = req.params;
		if (!orderId) {
			return res.status(422).json({
				success: false,
				message: 'Order Id not provided.',
			});
		}

		const order = await Order.findById(orderId);

		if (!order) {
			return res.status(404).json({
				success: false,
				message: 'Order not found',
			});
		}

		order.status = 'cancelled';
		await order.save();

		res.status(200).json({
			success: true,
			message: 'Order cancelled.',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to delete order',
		});
	}
};

module.exports = { createOrder, capturePayment, getAllOrders, getOrderDetails, cancelOrder };
