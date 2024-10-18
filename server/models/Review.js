const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema(
	{
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		reviewMessage: String,
		rating: Number,
	},
	{ timestamps: true }
);

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
