const mongoose = require('mongoose');
const AddressSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		address: String,
		city: String,
		state: String,
		pincode: String,
		phone: String,
		notes: String,
	},
	{ timestamps: true }
);

const Address = mongoose.model('Address', AddressSchema);
module.exports = Address;
