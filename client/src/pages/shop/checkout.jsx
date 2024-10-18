import Address from '@/components/shop/address';
import banner from '../../assets/garments-apparels-banner.jpg';
import { useDispatch, useSelector } from 'react-redux';
import CartContent from '@/components/shop/cartContent';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createOrder } from '@/store/shop/orderSlice';
import { Loader2 } from 'lucide-react';

function Checkout() {
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [isButtonPressed, setIsButtonPressed] = useState(false);
	const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);
	const { cartItems } = useSelector((state) => state.shopCart);
	const { user } = useSelector((state) => state.auth);
	const { approvalURL } = useSelector((state) => state.shopOrder);
	const totalAmount = cartItems.reduce((total, item) => {
		return total + item.quantity * (item.product.salePrice > 0 ? item.product.salePrice : item.product.price);
	}, 0);
	const { toast } = useToast();
	const dispatch = useDispatch();

	function initiatePaypalPayment() {
		setIsButtonPressed(true);
		if (selectedAddress === null) {
			toast({
				variant: 'destructive',
				title: 'Error!',
				description: 'No shipping address selected!',
			});
			setIsButtonPressed(false);
			return;
		}
		const orderData = {
			userId: user?.id,
			cartItems: cartItems?.map((item) => ({
				productId: item.product._id,
				title: item.product.title,
				image: item.product.image,
				quantity: item.quantity,
				price: item.product.salePrice > 0 ? item.product.salePrice : item.product.price,
			})),
			addressInfo: {
				address: selectedAddress?.address,
				city: selectedAddress?.city,
				state: selectedAddress?.state,
				phone: selectedAddress?.phone,
				pincode: selectedAddress?.pincode,
				notes: selectedAddress?.notes,
			},
			amount: +totalAmount?.toFixed(2),
		};

		dispatch(createOrder(orderData)).then((data) => {
			if (data?.payload?.success) {
				setIsPaymentInitiated(true);
			}
		});
	}

	if (approvalURL) {
		window.location.href = approvalURL;
	}

	return (
		<div className='flex flex-col'>
			<div className='relative h-[300px] w-full overflow-hidden'>
				<img src={banner} alt='banner-image' className='h-full w-full object-cover object-center' />
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-6 p-5'>
				<Address
					fromCheckout={true}
					selectedAddress={selectedAddress}
					setSelectedAddress={setSelectedAddress}
				/>
				<div className='flex flex-col gap-4'>
					{cartItems && cartItems.length > 0
						? cartItems.map((item) => <CartContent key={item?._id} item={item} />)
						: null}
					<Separator />
					<div className='flex justify-between items-center font-bold text-lg'>
						<span className='text-xl'>Total</span>
						<span>${totalAmount.toFixed(2)}</span>
					</div>
					<div className='flex justify-end mt-4 w-full'>
						{isButtonPressed ? (
							<Button className='text-lg font-bold w-1/3 bg-green-800 hover:bg-green-700' size='lg' disabled>
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
								Processing...
							</Button>
						) : (
							<Button
								onClick={initiatePaypalPayment}
								size='lg'
								className='text-lg font-bold w-1/3 bg-green-800 hover:bg-green-700'
								disabled={cartItems.length === 0}
							>
								Pay Now
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
