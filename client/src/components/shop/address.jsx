import { useEffect, useState } from 'react';
import Form from '../common/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { addressFormControls } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress, deleteAddress, getAllAddress, updateAddress } from '@/store/shop/addressSlice';
import { useToast } from '@/hooks/use-toast';
import AddressCard from './addressCard';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

const initialFormData = {
	address: '',
	city: '',
	state: '',
	pincode: '',
	phone: '',
	notes: '',
};

function Address({ fromCheckout = false, selectedAddress, setSelectedAddress }) {
	const [formData, setFormData] = useState(initialFormData);
	const [addressToEdit, setAddressToEdit] = useState(null);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { addresses } = useSelector((state) => state.shopAddress);
	const { toast } = useToast();

	useEffect(() => {
		dispatch(getAllAddress(user?.id));
	}, [dispatch, user]);

	function isFormValid() {
		return Object.keys(formData)
			.filter((key) => key !== 'notes')
			.map((key) => formData[key].trim() !== '')
			.every((item) => item);
	}

	function handleAdd(e) {
		e.preventDefault();
		dispatch(addNewAddress({ userId: user.id, formData })).then((data) => {
			if (data?.payload?.success) {
				dispatch(getAllAddress(user?.id));
				setFormData(initialFormData);
				toast({
					variant: 'success',
					title: 'Success!',
					description: 'Address added successfully.',
				});
			}
		});
	}

	function handleDelete(addressId) {
		dispatch(deleteAddress(addressId)).then((data) => {
			if (data?.payload?.success) {
				dispatch(getAllAddress(user?.id));
				toast({
					variant: 'success',
					title: 'Success!',
					description: 'Address deleted successfully.',
				});
			}
		});
	}

	function selectAddressToEdit(address) {
		setAddressToEdit(address?._id);
		setFormData({
			...formData,
			address: address?.address,
			city: address?.city,
			state: address?.state,
			pincode: address?.pincode,
			phone: address?.phone,
			notes: address?.notes,
		});
	}

	function handleEdit(e) {
		e.preventDefault();
		dispatch(updateAddress({ addressId: addressToEdit, formData })).then((data) => {
			if (data?.payload?.success) {
				dispatch(getAllAddress(user?.id));
				setFormData(initialFormData);
				setAddressToEdit(null);
				toast({
					variant: 'success',
					title: 'Success!',
					description: 'Address updated successfully.',
				});
			}
		});
	}

	return (
		<Card>
			{fromCheckout ? (
				<div className='mt-5 ml-5'>
					<Label className='text-lg font-semibold'>Select Shipping Address</Label>
				</div>
			) : null}

			<div
				className={`${fromCheckout ? 'lg:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} mb-5 p-3 grid grid-cols-1  gap-2`}
			>
				{addresses && addresses.length > 0 ? (
					addresses.map((address, index) => (
						<AddressCard
							key={index}
							addressInfo={address}
							index={index}
							handleDelete={handleDelete}
							onSelect={selectAddressToEdit}
							fromCheckout={fromCheckout}
							selectedAddress={selectedAddress}
							setSelectedAddress={setSelectedAddress}
						/>
					))
				) : (
					<p>You don't have any saved addresses.</p>
				)}
			</div>

			<CardHeader className='flex flex-row items-center justify-between mx-auto lg:w-1/2'>
				<CardTitle>{addressToEdit !== null ? 'Edit Address' : 'Add Address'}</CardTitle>
				{addressToEdit !== null ? (
					<Button
						onClick={() => {
							setAddressToEdit(null);
							setFormData(initialFormData);
						}}
					>
						Add Address
					</Button>
				) : null}
			</CardHeader>
			<CardDescription className='sr-only' />
			<CardContent className='space-y-3 mx-auto max-w-md lg:max-w-lg'>
				<Form
					formControls={addressFormControls}
					formData={formData}
					setFormData={setFormData}
					buttonText={addressToEdit !== null ? 'Edit Address' : 'Add Address'}
					isBtnDisabled={!isFormValid()}
					onSubmit={addressToEdit !== null ? handleEdit : handleAdd}
				/>
			</CardContent>
		</Card>
	);
}

export default Address;
