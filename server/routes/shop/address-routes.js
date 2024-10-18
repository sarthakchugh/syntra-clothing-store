const express = require('express');
const {
	getAllAddress,
	addAddress,
	updateAddress,
	deleteAddress,
} = require('../../controllers/shop/address-controller');
const router = express.Router();

router.get('/:userId', getAllAddress);
router.post('/add', addAddress);
router.put('/update', updateAddress);
router.delete('/:addressId', deleteAddress);

module.exports = router;
