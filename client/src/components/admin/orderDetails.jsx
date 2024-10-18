import { useState } from 'react';
import { DialogContent } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { formatDate, getOrderStatus } from '@/util/uiFormatter';
import { useDispatch } from 'react-redux';
import { getAllOrders, getOrderDetails, updateOrderStatus } from '@/store/admin/orderSlice';
import { useToast } from '@/hooks/use-toast';

const initialFormData = {
	status: '',
};

const statusControls = {
	label: 'Order Status',
	name: 'status',
	componentType: 'select',
	options: [
		{ id: 'pending', label: 'Pending' },
		{ id: 'confirmed', label: 'Confirmed' },
		{ id: 'cancelled', label: 'Cancelled' },
		{ id: 'shipping', label: 'Shipping' },
		{ id: 'shipped', label: 'Shipped' },
		{ id: 'delivery', label: 'Out for Delivery' },
		{ id: 'delivered', label: 'Delivered' },
	],
};

function OrderDetails({ order }) {
	const [formData, setFormData] = useState(initialFormData);
	const value = formData[statusControls.name] || '';
	const dispatch = useDispatch();
	const { toast } = useToast();

	function handleStatusUpdate() {
		dispatch(updateOrderStatus({ orderId: order?._id, status: formData.status })).then((data) => {
			if (data?.payload?.success) {
				dispatch(getAllOrders());
				dispatch(getOrderDetails(order?._id));
				toast({
					variant: 'success',
					title: 'Success!',
					description: 'Order status updated successfully.',
				});
			}
		});
	}

	return (
		<DialogContent className='sm:max-w-[600px]'>
			<div className='grid gap-6'>
				<div className='grid gap-2'>
					<div className='flex items-center justify-between mt-5'>
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
					<div className='grid gap-2 mb-3 max-h-[250px] overflow-y-scroll no-scrollbar'>
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
					<Separator />
					<div className='grid gap-2 mt-2'>
						<Label className='mb-2 text-base'>Order Status</Label>
						<div className='flex items-center justify-between gap-2'>
							<Select
								onValueChange={(value) =>
									setFormData({
										...formData,
										[statusControls.name]: value,
									})
								}
								value={value}
							>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder={getOrderStatus(order?.status)} />
								</SelectTrigger>
								<SelectContent>
									{statusControls.options && statusControls.options.length > 0
										? statusControls.options.map((optionItem) => (
												<SelectItem key={optionItem.id} value={optionItem.id}>
													{optionItem.label}
												</SelectItem>
										  ))
										: null}
								</SelectContent>
							</Select>
							<Button onClick={handleStatusUpdate}>Update</Button>
						</div>
					</div>
				</div>
			</div>
		</DialogContent>
	);
}

export default OrderDetails;
