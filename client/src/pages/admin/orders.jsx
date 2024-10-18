import { Dialog, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { useEffect, useState } from 'react';
import OrderDetails from '@/components/admin/orderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getOrderDetails } from '@/store/admin/orderSlice';
import { formatDate, getOrderStatus } from '@/util/uiFormatter';

function AdminOrders() {
	const [openDetails, setOpenDetails] = useState(false);
	const { orders, order } = useSelector((state) => state.adminOrder);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllOrders());
	}, [dispatch]);

	function showOrderDetails(orderId) {
		dispatch(getOrderDetails(orderId)).then((data) => {
			if (data?.payload?.success) {
				setOpenDetails(true);
			}
		});
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>All Orders</CardTitle>
			</CardHeader>
			<CardDescription className='sr-only'>History of all user orders</CardDescription>
			<CardContent>
				{orders && orders.length > 0 ? (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Order ID</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead className='sr-only'>View Details</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.map((orderItem) => (
								<TableRow key={orderItem.orderId} className='font-semibold'>
									<TableCell>{orderItem.orderId}</TableCell>
									<TableCell>{formatDate(orderItem.date)}</TableCell>
									<TableCell>{getOrderStatus(orderItem.status)}</TableCell>
									<TableCell>${orderItem.amount}</TableCell>
									<TableCell>
										<Dialog open={openDetails} onOpenChange={() => setOpenDetails(false)}>
											<DialogHeader>
												<DialogTitle className='sr-only'>Order Details</DialogTitle>
											</DialogHeader>
											<DialogDescription />
											<Button
												onClick={() => {
													showOrderDetails(orderItem.orderId);
												}}
											>
												View Details
											</Button>
											<OrderDetails order={order} />
										</Dialog>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<div>
						<span>You don't have any orders yet.</span>
					</div>
				)}
			</CardContent>
		</Card>
	);
}

export default AdminOrders;
