const Order = require('../../models/Order');
const Product = require('../../models/Product');
const salesData = require('../../util/salesData.json');

const getMostOrderedProducts = async (req, res) => {
	try {
		const result = await Order.aggregate([
			{
				// Step 1: Unwind the ItemList array
				$unwind: '$cartItems',
			},
			{
				// Step 2: Group by ProductId and count the occurrences
				$group: {
					_id: '$cartItems.productId',
					orderCount: { $sum: 1 },
				},
			},
			{
				// Step 3: Sort by order count in descending order
				$sort: { orderCount: -1 },
			},
			{
				// Step 4: Limit the results to the top 5
				$limit: 5,
			},
		]);

		const productDetails = await Promise.all(
			result.map(async (product) => {
				const prd = await Product.findById(product._id);
				return { ...prd.toObject(), orderCount: product.orderCount }; // Use .toObject() to convert the Mongoose document to a plain JS object
			})
		);

		res.status(200).json({
			success: true,
			data: productDetails,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to fetch products.',
		});
	}
};

const getProductsWithLessStock = async (req, res) => {
	try {
		const products = await Product.find().sort({ totalStock: 1 }).limit(5);
		res.status(200).json({
			success: true,
			data: products,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to fetch products.',
		});
	}
};

const getSalesData = async (req, res) => {
	try {
		res.status(200).json({
			success: true,
			data: salesData,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to fetch products.',
		});
	}
};

const getCategoryOrders = async (req, res) => {
	try {
		const result = await Order.aggregate([
			{
				// Unwind the cartItems array so we can work with each productId separately
				$unwind: '$cartItems',
			},
			{
				// Lookup to join the cartItems.productId with the Product collection _id
				$lookup: {
					from: 'products', // Name of the Product collection
					let: { productId: '$cartItems.productId' }, // Field in Order (inside cartItems)
					pipeline: [
						{
							$match: {
								$expr: {
									$eq: [{ $toString: '$_id' }, '$$productId'], // Compare ObjectId as string
								},
							},
						},
					], // Field in Product collection
					as: 'productDetails', // Output array field
				},
			},
			{
				// Unwind the productDetails array to have each order with a product document
				$unwind: '$productDetails',
			},
			{
				// Group by the category of the product and count the number of orders
				$group: {
					_id: '$productDetails.category', // Group by category
					orderCount: { $sum: 1 }, // Count the number of orders
				},
			},
			{
				// Sort by the count in descending order
				$sort: { orderCount: -1 },
			},
			{
				// Optional: You can project the result to rename the fields
				$project: {
					_id: 0, // Exclude the default _id
					category: '$_id', // Rename _id to category
					orderCount: 1, // Include orderCount in the output
				},
			},
		]);

		res.status(200).json({
			success: true,
			data: result,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to fetch products.',
		});
	}
};

module.exports = { getMostOrderedProducts, getProductsWithLessStock, getSalesData, getCategoryOrders };
