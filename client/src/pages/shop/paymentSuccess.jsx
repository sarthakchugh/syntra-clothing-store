import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { formatDate, getOrderStatus } from '@/util/uiFormatter';
import { CircleCheckBig } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
	const { order } = useSelector((state) => state.shopOrder);
	const navigate = useNavigate();
	return (
		<div className='grid gap-5'>
			<div className='flex flex-col items-center justify-center gap-2 mt-10'>
				<CircleCheckBig className='h-20 w-20' color='#4a7a37' />
				<span className='text-lg font-bold'>Payment Successful!</span>
			</div>
			<Card className='w-[60vw] mx-auto'>
				<CardHeader className='sr-only' />
				<CardDescription className='sr-only' />
				<CardContent>
					<div className='mt-4 grid gap-2'>
						<div className='flex items-center justify-between'>
							<div className='flex  items-center gap-2'>
								<Label>Order ID</Label>
								<span>{order?._id}</span>
							</div>
							<div className='flex items-center gap-2'>
								<Label>Date</Label>
								<span>{formatDate(order?.createdAt)}</span>
							</div>
						</div>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-2'>
								<Label>Amount</Label>
								<span>${order?.amount}</span>
							</div>
							<div className='flex items-center gap-2'>
								<Label>Status</Label>
								<span>{getOrderStatus(order?.status || 'pending')}</span>
							</div>
						</div>
						<Separator />
						<div className='grid gap-2 mb-3'>
							<Label className='mb-2 text-base'>Order Details</Label>
							{order?.cartItems &&
								order?.cartItems.length > 0 &&
								order?.cartItems.map((item) => (
									<div key={item._id} className='flex items-center justify-between'>
										<div className='flex items-center gap-2'>
											<div className='w-[70px] h-[70px]'>
												<img
													src={item.image}
													alt={item.title}
													className='w-full h-full object-cover rounded-lg'
												/>
											</div>
											<span>{item.title}</span>
										</div>
										<div className='flex items-center gap-2'>
											<span>Quantity:</span>
											<span>{item.quantity}</span>
										</div>
										<div>
											<span>${item.price}</span>
										</div>
									</div>
								))}
						</div>
						<Separator />
						<div className='grid gap-2'>
							<Label className='text-base'>Shipping Details</Label>
							<div className='grid gap-0.5'>
								<span className='text-muted-foreground'>{order?.userId?.username}</span>
								<span className='text-muted-foreground'>{order?.addressInfo?.address}</span>
								<span className='text-muted-foreground'>
									{order?.addressInfo?.city}, {order?.addressInfo?.state} - {order?.addressInfo?.pincode}
								</span>
								<span className='text-muted-foreground'>Contact: {order?.addressInfo?.phone}</span>
								<span className='text-muted-foreground'>Additional Notes: {order?.addressInfo?.notes}</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<div className='flex gap-4 items-center justify-center mb-10'>
				<Button onClick={() => navigate('/shop/products')}>Continue Shopping</Button>
				<Button onClick={() => navigate('/shop/account')}>View All Orders</Button>
			</div>
		</div>
	);
}

export default PaymentSuccess;
