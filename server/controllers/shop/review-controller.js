const Product = require('../../models/Product');
const Review = require('../../models/Review');
const User = require('../../models/User');
const Order = require('../../models/Order');

const addReview = async (req, res) => {
	try {
		const { productId, userId, reviewMessage, rating } = req.body;
		const order = await Order.findOne({ userId, 'cartItems.productId': productId, status: 'delivered' });
		if (!order) {
			return res.status(200).json({
				success: false,
				message: 'No order found for this product by this user.',
			});
		}

		const reviewExists = await Review.findOne({ userId, productId });
		if (reviewExists) {
			return res.status(200).json({
				success: false,
				message: 'User already has a review. Cannot add more.',
			});
		}

		const newReview = new Review({
			userId,
			productId,
			reviewMessage,
			rating,
		});

		await newReview.save();

		// todo: Change product rating according to this review.
		const reviews = await Review.find({ productId });
		const numberOfReviews = reviews.length;
		const avgRating =
			reviews.reduce((totalRating, review) => totalRating + review.rating, 0) / numberOfReviews;

		const product = await Product.findById(productId);
		product.rating = avgRating;
		await product.save();

		res.status(201).json({
			success: true,
			message: 'Review added.',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to add product review.',
		});
	}
};

const getReviews = async (req, res) => {
	try {
		const { productId } = req.params;
		const reviews = await Review.find({ productId }).populate({ path: 'userId', select: 'username' });

		res.status(200).json({
			success: true,
			data: reviews,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to fetch product reviews.',
		});
	}
};

module.exports = { addReview, getReviews };
