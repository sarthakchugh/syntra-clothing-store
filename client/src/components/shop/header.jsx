import { LogOut, Menu, ShoppingCart, Store, User } from 'lucide-react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { shopHeaderMenuItems } from '@/config';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { resetToken } from '@/store/authSlice';
import { useEffect, useState } from 'react';
import CartWrapper from './cartWrapper';
import { Label } from '../ui/label';
import { getCartItems } from '@/store/shop/cartSlice';
import { Badge } from '../ui/badge';

function MenuItems() {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();

	function handleNavigateToProductPage(selection, section) {
		sessionStorage.removeItem('filters');
		const filters =
			selection.id !== 'home' && selection.id !== 'products' && selection.id !== 'search'
				? {
						[section]: [selection.id],
				  }
				: null;
		sessionStorage.setItem('filters', JSON.stringify(filters));
		location.pathname.includes('products') && filters !== null
			? setSearchParams(new URLSearchParams(`?category=${selection.id}`))
			: navigate(selection.path);
	}

	return (
		<nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
			{shopHeaderMenuItems.map((menuItem) => (
				<Label
					key={menuItem.id}
					onClick={() => handleNavigateToProductPage(menuItem, 'category')}
					className='text-sm font-medium cursor-pointer'
				>
					{menuItem.label}
				</Label>
			))}
		</nav>
	);
}

function HeaderRightContent() {
	const { user } = useSelector((state) => state.auth);
	const [openCartSheet, setOpenCartSheet] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { cartItems } = useSelector((state) => state.shopCart);

	useEffect(() => {
		dispatch(getCartItems(user.id)); // Get cart items
	}, [dispatch, user]);

	function handleLogout() {
		// dispatch(logoutUser());
		dispatch(resetToken());
		sessionStorage.clear();
		navigate('/auth/login');
	}

	return (
		<div className='flex lg:items-center lg:flex-row flex-col gap-4'>
			<Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
				<Button
					onClick={() => {
						dispatch(getCartItems(user.id));
						setOpenCartSheet(true);
					}}
					variant='outline'
					size='icon'
				>
					<ShoppingCart className='w-6 h-6' />
					<Badge className={'absolute top-2 right-[65px] bg-red-500 hover:bg-red-600 px-1.5'}>
						{cartItems?.reduce((totalItems, item) => {
							return totalItems + item.quantity;
						}, 0)}
					</Badge>
					<span className='sr-only'>User Cart</span>
				</Button>
				<CartWrapper setOpenCartSheet={setOpenCartSheet} />
			</Sheet>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className='bg-black cursor-pointer'>
						<AvatarFallback className='bg-black text-white font-extrabold'>
							{user?.name?.[0].toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent side='right' className='w-56'>
					<DropdownMenuLabel>Logged in as {user?.name}</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => navigate('/shop/account')} className='cursor-pointer'>
						<User className='mr-2 h-4 w-4' /> <span>Account</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
						<LogOut className='mr-2 h-4 w-4' /> <span>Logout</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

function ShoppingHeader() {
	return (
		<header className='sticky top-0 z-40 w-full border-b bg-background'>
			<div className='flex h-16 items-center justify-between px-4 md:px-6'>
				<Link to={'/shop/home'} className='flex items-center gap-2'>
					<Store className='h-6 w-6' />
					<span className='font-bold text-xl'>Syntra</span>
				</Link>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant='outline' size='icon' className='lg:hidden'>
							<Menu className='h-6 w-6' />
							<span className='sr-only'>Toggle Header Menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side='left' className='w-full max-w-xs'>
						<MenuItems />
						<HeaderRightContent />
					</SheetContent>
				</Sheet>
				<div className='hidden lg:block'>
					<MenuItems />
				</div>
				<div className='hidden lg:block'>
					<HeaderRightContent />
				</div>
			</div>
		</header>
	);
}

export default ShoppingHeader;
