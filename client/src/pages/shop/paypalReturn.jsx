import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { capturePayment } from '@/store/shop/orderSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';

function PaypalReturn() {
	const dispatch = useDispatch();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const paymentId = params.get('paymentId');
	const payerId = params.get('PayerID');
	const navigate = useNavigate();

	useEffect(() => {
		if (paymentId && payerId) {
			const orderId = sessionStorage.getItem('orderId');
			dispatch(capturePayment({ orderId, paymentId, payerId })).then((data) => {
				sessionStorage.removeItem('orderId');
				if (data?.payload?.success) {
					setTimeout(() => {
						// window.location.href = '/shop/payment/success';
						navigate('/shop/payment/success');
					}, 2000);
				}
			});
		}
	}, [dispatch, paymentId, payerId, navigate]);
	return (
		<div className='flex items-center justify-center w-[100vw] h-[91vh] bg-black/70'>
			<Card className='w-[50%] h-[50%] -translate-y-5'>
				<CardHeader className='sr-only' />
				<CardDescription className='sr-only' />
				<CardContent>
					<div className='flex flex-col items-center justify-center gap-5 mt-[110px]'>
						<ThreeCircles
							visible={true}
							height='100'
							width='100'
							color='#4fa94d'
							ariaLabel='three-circles-loading'
							wrapperStyle={{}}
							wrapperClass=''
						/>
						<div>
							<span className='text-xl font-bold'>Your payment is being processed...</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default PaypalReturn;
