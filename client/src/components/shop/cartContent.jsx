/* eslint-disable react/prop-types */
import { Minus, Plus, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, updateCartItem } from '@/store/shop/cartSlice';
import { useToast } from '@/hooks/use-toast';

function CartContent({ item }) {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { productList } = useSelector((state) => state.shopProducts);
	const { toast } = useToast();

	function handleDelete(productId) {
		dispatch(deleteCartItem({ userId: user.id, productId })).then((data) => {
			if (data?.payload?.success) {
				toast({
					variant: 'success',
					title: 'Success!',
					description: 'Item removed from cart.',
				});
			}
		});
	}

	function handleUpdate(productId, operation) {
		if (operation === 'add') {
			const product = productList.find((p) => p._id.toString() === productId);
			if (item.quantity + 1 > product.totalStock) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! There is a problem.',
					description: `You can only add ${product.totalStock} qty of this item.`,
				});

				return;
			}
		}

		let quantity;
		if (operation === 'add') quantity = 1;
		else quantity = -1;
		dispatch(updateCartItem({ userId: user.id, productId, quantity })).then((data) => {
			if (data?.payload?.success) {
				toast({
					title: 'Success!',
					description: 'Item has been updated',
				});
			}
		});
	}

	return (
		<div className='flex items-center space-x-4'>
			<img src={item?.product?.image} alt={item?.product?.title} className='w-20 h-20 rounded object-cover' />
			<div className='flex-1'>
				<h3 className='font-bold'>{item?.product?.title}</h3>
				<div className='flex items-center mt-1 gap-2'>
					<Button
						variant='outline'
						size='icon'
						className='w-8 h-8 rounded-full'
						onClick={() => handleUpdate(item?.product?._id, 'subtract')}
					>
						<Minus className='w-4 h-4' />
						<span className='sr-only'>Decrease</span>
					</Button>
					<span className='font-semibold'>{item?.quantity}</span>
					<Button
						variant='outline'
						size='icon'
						className='w-8 h-8 rounded-full'
						onClick={() => handleUpdate(item?.product?._id, 'add')}
					>
						<Plus className='w-4 h-4' />
						<span className='sr-only'>Increase</span>
					</Button>
				</div>
			</div>
			<div className='flex flex-col items-end'>
				<span className='font-bold mr-2'>
					$
					{(
						(item?.product?.salePrice > 0 ? item?.product?.salePrice : item?.product?.price) * item?.quantity
					).toFixed(2)}
				</span>
				<Trash
					onClick={() => handleDelete(item?.product?._id)}
					color='red'
					className='cursor-pointer mt-2 mr-2'
				/>
			</div>
		</div>
	);
}

export default CartContent;
