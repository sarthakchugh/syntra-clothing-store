const Address = require('../../models/Address');
const User = require('../../models/User');

const addAddress = async (req, res) => {
	try {
		const { userId, address, city, state, pincode, phone, notes } = req.body;
		if (!userId || !address || !city || !state || !pincode || !phone) {
			return res.status(422).json({
				success: false,
				message: 'Invalid data!',
			});
		}

		const newAddress = new Address({
			userId,
			address,
			city,
			state,
			pincode,
			phone,
			notes,
		});

		await newAddress.save();
		res.status(201).json({
			success: true,
			data: newAddress,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to add address.',
		});
	}
};

const getAllAddress = async (req, res) => {
	try {
		const { userId } = req.params;
		if (!userId) {
			return res.status(422).json({
				success: false,
				message: 'Invalid data!',
			});
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'User not found!',
			});
		}

		const addresses = await Address.find({ userId });

		res.status(200).json({
			success: true,
			data: addresses,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to get addresses.',
		});
	}
};

const updateAddress = async (req, res) => {
	try {
		const { addressId, address, city, state, pincode, phone, notes } = req.body;
		if (!addressId || !address || !city || !state || !pincode || !phone) {
			return res.status(422).json({
				success: false,
				message: 'Invalid data!',
			});
		}

		const addressToUpdate = await Address.findById(addressId);
		if (!addressToUpdate) {
			return res.status(404).json({
				success: false,
				message: 'Address not found.',
			});
		}

		addressToUpdate.address = address || addressToUpdate.address;
		addressToUpdate.city = city || addressToUpdate.city;
		addressToUpdate.state = state || addressToUpdate.state;
		addressToUpdate.pincode = pincode || addressToUpdate.pincode;
		addressToUpdate.phone = phone || addressToUpdate.phone;
		addressToUpdate.notes = notes || addressToUpdate.notes;

		await addressToUpdate.save();
		res.status(200).json({
			success: true,
			data: addressToUpdate,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to update address.',
		});
	}
};

const deleteAddress = async (req, res) => {
	try {
		const { addressId } = req.params;
		if (!addressId) {
			return res.status(422).json({
				success: false,
				message: 'Invalid data!',
			});
		}

		const address = await Address.findByIdAndDelete(addressId);
		if (!address) {
			return res.status(404).json({
				success: false,
				message: 'Address not found!',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Address deleted.',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Failed to delete address.',
		});
	}
};

module.exports = { addAddress, getAllAddress, updateAddress, deleteAddress };
