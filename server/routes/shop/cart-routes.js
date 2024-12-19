const express = require('express');
const {
    getCartItems,
    addToCart,
    deleteCartItems,
    updateCartItems,
} = require('../../controllers/shop/cart-controller');
const { authMiddleware } = require('../../controllers/auth/auth-controller');
const router = express.Router();

router.get('/:userId', authMiddleware, getCartItems);
router.post('/add', authMiddleware, addToCart);
router.put('/update', authMiddleware, updateCartItems);
router.delete('/:userId/:productId', authMiddleware, deleteCartItems);

module.exports = router;
