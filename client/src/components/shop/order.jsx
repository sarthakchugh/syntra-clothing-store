import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import OrderDetails from './orderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, getOrderDetails } from '@/store/shop/orderSlice';
import { formatDate, getOrderStatus } from '@/util/uiFormatter';

function Order() {
    const [openDetails, setOpenDetails] = useState(false);
    const { orders, order } = useSelector((state) => state.shopOrder);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrders(user.id));
    }, [dispatch, user]);

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
                <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardDescription className="sr-only">History of all user's orders</CardDescription>
            <CardContent>
                {orders && orders.length > 0 ? (
                    <>
                        <Table className="hidden md:table">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="sr-only">View Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((orderItem) => (
                                    <TableRow key={orderItem.orderId} className="font-semibold">
                                        <TableCell>{orderItem.orderId}</TableCell>
                                        <TableCell>{formatDate(orderItem.date)}</TableCell>
                                        <TableCell>{getOrderStatus(orderItem.status)}</TableCell>
                                        <TableCell>${orderItem.amount}</TableCell>
                                        <TableCell>
                                            <Dialog
                                                open={openDetails}
                                                onOpenChange={() => setOpenDetails(false)}
                                            >
                                                <DialogHeader>
                                                    <DialogTitle className="sr-only">
                                                        Order Details
                                                    </DialogTitle>
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
                        <Table className="md:hidden">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((orderItem) => (
                                    <TableRow key={orderItem.orderId} className="font-semibold">
                                        <TableCell >
                                            {orderItem.orderId}
                                            <Dialog
                                                open={openDetails}
                                                onOpenChange={() => setOpenDetails(false)}
                                            >
                                                <DialogHeader>
                                                    <DialogTitle className="sr-only">
                                                        Order Details
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <DialogDescription />
                                                <Button
                                                    className="mt-2 md:mt-0"
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
                    </>
                ) : (
                    <div>
                        <span>You don't have any orders yet.</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export default Order;
