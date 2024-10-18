import { Routes, Route } from 'react-router-dom';
import AuthLayout from './components/auth/layout';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import AdminLayout from './components/admin/layout';
import AdminDashboard from './pages/admin/dashboard';
import AdminOrders from './pages/admin/orders';
import AdminProducts from './pages/admin/products';
import ShoppingLayout from './components/shop/layout';
import NotFound404 from './pages/errorPages/404NotFound';
import ShoppingHome from './pages/shop/home';
import ProductListing from './pages/shop/productListing';
import Account from './pages/shop/account';
import Checkout from './pages/shop/checkout';
import CheckAuth from './components/common/check-auth';
import Unauthorized403 from './pages/errorPages/403Unauthorized';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/authSlice';
import PaymentSuccess from './pages/shop/paymentSuccess';
import PaypalReturn from './pages/shop/paypalReturn';
import Search from './pages/shop/search';
import PaymentFail from './pages/shop/paymentFail';
import { Skeleton } from './components/ui/skeleton';

function App() {
	const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const token = JSON.parse(sessionStorage.getItem('token'));
	useEffect(() => {
		dispatch(checkAuth(token));
	}, [dispatch, token]);

	if (isLoading)
		return (
			<div className='w-screen h-screen overflow-clip grid place-content-center gap-2'>
				<Skeleton className={'h-[200px] w-[300px]'} />
				<Skeleton className={'h-[20px] w-[300px]'} />
				<Skeleton className={'h-[20px] w-[200px]'} />
			</div>
		);

	return (
		<>
			<div className='flex flex-col overflow-hidden bg-white'>
				<Routes>
					<Route path='/' element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />} />

					<Route
						path='/auth'
						element={
							<CheckAuth isAuthenticated={isAuthenticated} user={user}>
								<AuthLayout />
							</CheckAuth>
						}
					>
						<Route path='login' element={<Login />} />
						<Route path='register' element={<Register />} />
					</Route>
					<Route
						path='/admin'
						element={
							<CheckAuth isAuthenticated={isAuthenticated} user={user}>
								<AdminLayout />
							</CheckAuth>
						}
					>
						<Route path='dashboard' element={<AdminDashboard />} />
						<Route path='orders' element={<AdminOrders />} />
						<Route path='products' element={<AdminProducts />} />
					</Route>
					<Route
						path='/shop'
						element={
							<CheckAuth isAuthenticated={isAuthenticated} user={user}>
								<ShoppingLayout />
							</CheckAuth>
						}
					>
						<Route path='home' element={<ShoppingHome />} />
						<Route path='products' element={<ProductListing />} />
						<Route path='account' element={<Account />} />
						<Route path='checkout' element={<Checkout />} />
						<Route path='search' element={<Search />} />
						<Route path='paypal/return' element={<PaypalReturn />} />
						<Route path='payment/success' element={<PaymentSuccess />} />
						<Route path='payment/fail' element={<PaymentFail />} />
					</Route>
					<Route path='/403-unauthorized' element={<Unauthorized403 />} />
					<Route path='*' element={<NotFound404 />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
