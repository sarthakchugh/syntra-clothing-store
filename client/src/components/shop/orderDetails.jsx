import { DialogContent } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { formatDate, getOrderStatus } from '@/util/uiFormatter';

function OrderDetails({ order }) {
    return (
        <DialogContent className="max-w-sm md:max-w-[600px] rounded-lg">
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mt-5">
                        <div className="flex items-center gap-2">
                            <Label>Order ID</Label>
                            <span>{order?._id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label>Date</Label>
                            <span>{formatDate(order?.createdAt)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Label>Amount</Label>
                            <span>${order?.amount}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Label>Status</Label>
                            <span>{getOrderStatus(order?.status || 'pending')}</span>
                        </div>
                    </div>
                    <Separator />
                    <div className="grid gap-2 mb-3 max-h-[250px] overflow-y-scroll no-scrollbar">
                        <Label className="mb-2 text-base">Order Details</Label>
                        {order?.cartItems &&
                            order?.cartItems.length > 0 &&
                            order?.cartItems.map((item) => (
                                <div key={item._id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-[70px] h-[70px]">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                        <span>{item.title}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
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
                    <div className="grid gap-2">
                        <Label className="text-base">Shipping Details</Label>
                        <div className="grid gap-0.5">
                            <span className="text-muted-foreground">{order?.userId?.username}</span>
                            <span className="text-muted-foreground">{order?.addressInfo?.address}</span>
                            <span className="text-muted-foreground">
                                {order?.addressInfo?.city}, {order?.addressInfo?.state} -{' '}
                                {order?.addressInfo?.pincode}
                            </span>
                            <span className="text-muted-foreground">
                                Contact: {order?.addressInfo?.phone}
                            </span>
                            <span className="text-muted-foreground">
                                Additional Notes: {order?.addressInfo?.notes}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    );
}

export default OrderDetails;
