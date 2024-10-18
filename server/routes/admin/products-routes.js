const express = require('express');
const router = express.Router();

const {
	handleImageUpload,
	addNewProduct,
	fetchAllProducts,
	deleteProduct,
	editProduct,
} = require('../../controllers/admin/products-controller');

const { upload } = require('../../util/cloudinary');

router.post('/upload', upload.single('product_file'), handleImageUpload);
router.post('/add', addNewProduct);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/', fetchAllProducts);

module.exports = router;
