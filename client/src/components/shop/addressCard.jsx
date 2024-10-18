import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';

function AddressCard({
	index,
	addressInfo,
	handleDelete,
	onSelect,
	fromCheckout,
	selectedAddress,
	setSelectedAddress,
}) {
	return (
		<Card
			onClick={fromCheckout ? () => setSelectedAddress(addressInfo) : () => {}}
			className={`${
				selectedAddress?._id.toString() === addressInfo?._id.toString() ? 'border-red-600' : ''
			} ${fromCheckout ? 'cursor-pointer' : ''}`}
		>
			<CardHeader className='flex flex-row justify-between items-center py-3'>
				<CardTitle className='font-bold'>Address {index + 1}</CardTitle>
				<div className='flex gap-3'>
					<Button variant='outline' size='sm' onClick={() => onSelect(addressInfo)}>
						Edit
					</Button>
					<Button variant='destructive' size='sm' onClick={() => handleDelete(addressInfo?._id)}>
						Delete
					</Button>
				</div>
			</CardHeader>
			<CardDescription />
			<CardContent className='grid gap-2'>
				<Label>{addressInfo?.address}</Label>
				<Label>
					{addressInfo?.city}, {addressInfo?.state} - {addressInfo?.pincode}
				</Label>
				<Label>Contact: {addressInfo?.phone}</Label>
				<Label>Additional Notes: {addressInfo?.notes}</Label>
			</CardContent>
		</Card>
	);
}

export default AddressCard;
