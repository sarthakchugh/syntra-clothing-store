const express = require('express');
const {
	getCartItems,
	addToCart,
	deleteCartItems,
	updateCartItems,
} = require('../../controllers/shop/cart-controller');
const router = express.Router();

router.get('/:userId', getCartItems);
router.post('/add', addToCart);
router.put('/update', updateCartItems);
router.delete('/:userId/:productId', deleteCartItems);

module.exports = router;
