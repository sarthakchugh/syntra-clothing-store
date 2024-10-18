import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { cancelOrder } from '@/store/shop/orderSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';

function PaymentFail() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const orderId = sessionStorage.getItem('orderId');
		dispatch(cancelOrder(orderId));
	}, [dispatch]);

	return (
		<div className='flex items-center justify-center w-[100vw] h-[91vh] bg-black/70'>
			<Card className='w-[50%] h-[50%] -translate-y-5'>
				<CardHeader className='sr-only' />
				<CardDescription className='sr-only' />
				<CardContent>
					<div className='flex flex-col items-center justify-center gap-5 mt-[70px]'>
						<CircleX color='#e80202' className='h-20 w-20' />
						<div>
							<span className='text-xl font-bold'>
								Uh oh! Looks like there was an issue with the payment.
							</span>
						</div>
						<div className='flex gap-2 mt-4'>
							<Button onClick={() => navigate('/shop/checkout')}>Retry Payment</Button>
							<Button onClick={() => navigate('/shop/products')}>Continue Shopping</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default PaymentFail;
