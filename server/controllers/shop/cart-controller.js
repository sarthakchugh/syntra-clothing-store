const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

const addToCart = async (req, res) => {
	try {
		const { userId, productId, quantity } = req.body;
		if (!userId || !productId || quantity <= 0) {
			return res.status(422).json({
				success: false,
				message: 'Invalid data!',
			});
		}

		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({
				success: false,
				message: 'Failed to find product.',
			});
		}

		let cart = await Cart.findOne({ user: userId });
		if (!cart) {
			cart = new Cart({
				user: userId,
				items: [],
			});
		}

		const productIndex = cart.items.findIndex((item) => item.product._id.toString() === productId);
		if (productIndex === -1) {
			cart.items.push({ product: productId, quantity });
		} else {
			cart.items[productIndex].quantity += quantity;
		}

		await cart.save();

		cart = await Cart.findOne({ user: userId }).populate({
			path: 'items.product',
			select: 'image title price salePrice',
		});

		res.status(200).json({
			success: true,
			data: cart,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to add item to cart.',
		});
	}
};

const getCartItems = async (req, res) => {
	try {
		const { userId } = req.params;
		if (!userId) {
			return res.status(422).json({
				success: false,
				message: 'User Id not provided.',
			});
		}

		const cart = await Cart.findOne({ user: userId }).populate({
			path: 'items.product',
			select: 'image title price salePrice',
		});

		if (!cart) {
			return res.status(404).json({
				success: false,
				message: 'Cart not found!',
			});
		}

		// todo: Checking if any item has been removed by admin while in cart.
		const validItems = cart.items.filter((cartItem) => cartItem.product);

		if (validItems.length < cart.items.length) {
			cart.items = validItems;
			await cart.save();
		}

		// const populateCartItems = validItems.map((cartItem) => ({
		// 	productId: cartItem.product._id,
		// 	image: cartItem.product.image,
		// 	title: cartItem.product.title,
		// 	price: cartItem.product.price,
		// 	salePrice: cartItem.product.salePrice,
		// 	quantity: cartItem.quantity,
		// }));

		res.status(200).json({
			success: true,
			data: cart,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to get cart items.',
		});
	}
};

const updateCartItems = async (req, res) => {
	try {
		const { userId, productId, quantity } = req.body;
		if (!userId || !productId || !quantity) {
			return res.status(422).json({
				success: false,
				message: 'Invalid data!',
			});
		}

		const product = await Product.findById(productId);
		if (!product) {
			return res.status(404).json({
				success: false,
				message: 'Failed to find product.',
			});
		}

		const cart = await Cart.findOne({ user: userId }).populate({
			path: 'items.product',
			select: 'image title price salePrice',
		});
		const productIndex = cart.items.findIndex((item) => item.product._id.toString() === productId);
		const cartProduct = cart.items[productIndex];
		if (!cartProduct) {
			return res.status(404).json({
				success: false,
				message: "Product doesn't exist in cart.",
			});
		}

		if (cartProduct.quantity + quantity <= 0) {
			cart.items = cart.items.filter((cartItem) => cartItem.product._id.toString() !== productId);
		} else {
			cart.items[productIndex].quantity += quantity;
		}

		await cart.save();
		res.status(200).json({
			success: true,
			data: cart,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to update items in cart.',
		});
	}
};

const deleteCartItems = async (req, res) => {
	try {
		const { userId, productId } = req.params;
		if (!userId || !productId) {
			return res.status(422).json({
				success: false,
				message: 'Invalid data!',
			});
		}

		const cart = await Cart.findOne({ user: userId }).populate({
			path: 'items.product',
			select: 'image title price salePrice',
		});

		if (!cart) {
			return res.status(404).json({
				success: false,
				message: 'Cart not found!',
			});
		}

		cart.items = cart.items.filter((cartItem) => cartItem.product._id.toString() !== productId);
		await cart.save();

		res.status(200).json({
			success: true,
			data: cart,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to delete items in cart.',
		});
	}
};

module.exports = { addToCart, getCartItems, updateCartItems, deleteCartItems };
