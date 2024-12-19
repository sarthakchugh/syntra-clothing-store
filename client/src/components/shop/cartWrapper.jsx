import { useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import CartContent from './cartContent';
import { useNavigate } from 'react-router-dom';

function CartWrapper({ setOpenCartSheet }) {
	const navigate = useNavigate();
	const { cartItems } = useSelector((state) => state.shopCart);
	const totalAmount = cartItems.reduce((total, item) => {
		return total + item.quantity * (item.product.salePrice > 0 ? item.product.salePrice : item.product.price);
	}, 0);
	return (
		<SheetContent className='w-full sm:max-w-[450px]'>
			<SheetHeader>
				<SheetTitle className='font-bold text-xl'>Your Cart</SheetTitle>
			</SheetHeader>
			<SheetDescription className='sr-only'>Cart Sidebar</SheetDescription>
			<div className='mt-8 space-y-4 overflow-y-scroll h-[75vh] scrollbar-w-10 scrollbar-track-white scrollbar-thumb-black'>
				{cartItems && cartItems.length > 0
					? cartItems.map((cartItem) => <CartContent key={cartItem.product_id} item={cartItem} />)
					: null}
			</div>
			<div className='flex justify-between items-center mt-4 font-bold text-lg'>
				<span>Total</span>
				<span>${totalAmount.toFixed(2)}</span>
			</div>
			<Button
				onClick={() => {
					navigate('/shop/checkout');
					setOpenCartSheet(false);
				}}
				className='w-full mt-4'
				disabled={cartItems.length === 0}
			>
				Checkout
			</Button>
		</SheetContent>
	);
}

export default CartWrapper;
