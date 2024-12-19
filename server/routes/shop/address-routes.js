const express = require('express');
const {
    getAllAddress,
    addAddress,
    updateAddress,
    deleteAddress,
} = require('../../controllers/shop/address-controller');
const { authMiddleware } = require('../../controllers/auth/auth-controller');
const router = express.Router();

router.get('/:userId', authMiddleware, getAllAddress);
router.post('/add', authMiddleware, addAddress);
router.put('/update', authMiddleware, updateAddress);
router.delete('/:addressId', authMiddleware, deleteAddress);

module.exports = router;
