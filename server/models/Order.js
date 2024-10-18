const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		cartItems: [
			{
				productId: String,
				image: String,
				title: String,
				price: String,
				quantity: Number,
			},
		],
		addressInfo: {
			address: String,
			city: String,
			state: String,
			pincode: String,
			phone: String,
			notes: String,
		},
		status: {
			type: String,
			required: true,
		},
		paymentMethod: String,
		paymentStatus: String,
		amount: Number,
		payerId: String,
		paymentId: String,
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
