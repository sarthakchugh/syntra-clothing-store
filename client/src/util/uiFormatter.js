export function formatDate(isoDate) {
	const dateObj = new Date(isoDate);
	const options = { day: 'numeric', month: 'short', year: 'numeric' };
	return dateObj.toLocaleDateString('en-US', options);
}

export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getOrderStatus(status) {
	const orderStatusMatrix = {
		pending: 'Pending',
		confirmed: 'Confirmed',
		cancelled: 'Cancelled',
		shipping: 'Shipping',
		shipped: 'Shipped',
		delivery: 'Out for Delivery',
		delivered: 'Delivered',
	};
	return orderStatusMatrix[status];
}
