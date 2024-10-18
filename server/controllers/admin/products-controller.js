const { imageUploadUtil } = require('../../util/cloudinary');
const { Buffer } = require('buffer');
const Product = require('../../models/Product');

// todo: Handle Product Image Upload
const handleImageUpload = async (req, res) => {
	try {
		const b64 = Buffer.from(req.file.buffer).toString('base64');
		const url = 'data:' + req.file.mimetype + ';base64,' + b64;
		const result = await imageUploadUtil(url);

		res.json({
			success: true,
			result,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'An error occurred!',
		});
	}
};

// todo: Add a new product
const addNewProduct = async (req, res) => {
	try {
		const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
		const newProduct = new Product({
			image,
			title,
			description,
			category,
			brand,
			price,
			salePrice,
			totalStock,
		});
		await newProduct.save();
		res.status(201).json({
			success: true,
			message: 'Product Added.',
			data: newProduct,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: 'An error occurred!',
		});
	}
};

// todo: Fetch all products
const fetchAllProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.status(200).json({
			success: true,
			data: products,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: 'An error occurred!',
		});
	}
};

// todo: Edit a product
const editProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
		const productExists = await Product.findById(id);
		if (!productExists) {
			return res.status(404).json({
				success: false,
				message: 'Failed to find the product',
			});
		}

		// ! Add better update logic here
		productExists.title = title || productExists.title;
		productExists.description = description || productExists.description;
		productExists.category = category || productExists.category;
		productExists.brand = brand || productExists.brand;
		productExists.price = price || productExists.price;
		productExists.salePrice = salePrice === '' ? 0 : salePrice || productExists.salePrice;
		productExists.totalStock = totalStock || productExists.totalStock;
		productExists.image = image || productExists.image;

		await productExists.save();
		res.status(200).json({
			success: true,
			message: 'Product Edited.',
			data: productExists,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: 'An error occurred!',
		});
	}
};

// todo: Delete a product
const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;
		const product = await Product.findByIdAndDelete(id);
		if (!product) {
			return res.status(404).json({
				success: false,
				message: 'Failed to find product',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Product Deleted.',
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: 'An error occurred!',
		});
	}
};

module.exports = { handleImageUpload, addNewProduct, deleteProduct, editProduct, fetchAllProducts };
