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
const { authMiddleware } = require('../../controllers/auth/auth-controller');

router.post('/upload', upload.single('product_file'), authMiddleware, handleImageUpload);
router.post('/add', authMiddleware, addNewProduct);
router.put('/edit/:id', authMiddleware, editProduct);
router.delete('/delete/:id', authMiddleware, deleteProduct);
router.get('/', authMiddleware, fetchAllProducts);

module.exports = router;
