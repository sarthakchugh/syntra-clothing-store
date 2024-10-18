const Product = require('../../models/Product');

const searchProducts = async (req, res) => {
	try {
		const { keyword } = req.params;
		if (!keyword || typeof keyword !== 'string') {
			return res.status(422).json({
				success: false,
				message: 'Keyword is invalid.',
			});
		}

		const regex = new RegExp(keyword, 'i');
		const searchQuery = {
			$or: [{ title: regex }, { brand: regex }, { category: regex }, { description: regex }],
		};

		const products = await Product.find(searchQuery);
		res.status(200).json({
			success: true,
			data: products,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to search for the product',
		});
	}
};

module.exports = { searchProducts };
