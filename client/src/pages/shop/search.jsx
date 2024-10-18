import ProductDetails from '@/components/shop/productDetails';
import ShopProductTile from '@/components/shop/productTile';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { addToCart } from '@/store/shop/cartSlice';
import { fetchProductDetails } from '@/store/shop/productSlice';
import { resetSearch, searchProducts } from '@/store/shop/searchSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function Search() {
	const [keyword, setKeyword] = useState('');
	const [searchParams, setSearchParams] = useSearchParams();
	const { products } = useSelector((state) => state.shopSearch);
	const dispatch = useDispatch();
	const { productDetails } = useSelector((state) => state.shopProducts);
	const { user } = useSelector((state) => state.auth);
	const { cartItems } = useSelector((state) => state.shopCart);
	const [openProductDetails, setOpenProductDetails] = useState(false);
	const { toast } = useToast();

	useEffect(() => {
		let timer;
		if (keyword && keyword.trim() !== '') {
			timer = setTimeout(() => {
				setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
				dispatch(searchProducts(keyword));
			}, 500);
		} else {
			setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
			dispatch(resetSearch());
		}
		return () => {
			clearTimeout(timer);
		};
	}, [keyword, setSearchParams, dispatch]);

	function handleProductDetails(productId) {
		dispatch(fetchProductDetails(productId));
		setOpenProductDetails(true);
	}

	function handleAddToCart(productId, totalStock) {
		if (cartItems.length) {
			const selectedItem = cartItems.find((item) => item.product._id.toString() === productId.toString());
			if (selectedItem) {
				if (selectedItem.quantity + 1 > totalStock) {
					toast({
						variant: 'destructive',
						title: 'Uh oh! There is a problem.',
						description: `You can only add ${totalStock} qty of this item.`,
					});

					return;
				}
			}
		}

		dispatch(addToCart({ userId: user.id, productId, quantity: 1 })).then((data) => {
			if (data?.payload?.success) {
				toast({
					variant: 'success',
					title: 'Success!',
					description: 'Item added to cart.',
				});
			} else {
				toast({
					variant: 'destructive',
					title: 'Error!',
					description: 'Failed to add item to cart',
				});
			}
		});
	}

	return (
		<div className='container mx-auto md:px-6 px-4 py-8'>
			<div className='flex justify-center mb-8'>
				<div className='w-[50%] flex items-center'>
					<Input
						value={keyword}
						name='keyword'
						onChange={(e) => setKeyword(e.target.value)}
						className='py-6'
						placeholder='Search Products'
					/>
				</div>
			</div>
			<span className='text-xl font-bold'>Search Results</span>
			<Separator />
			{products && products.length === 0 ? (
				<div className='mt-5'>
					<span className='text-2xl font-bold'>
						Sorry! We found no products matching this search criteria.
					</span>
				</div>
			) : null}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5'>
				{products && products.length > 0
					? products.map((item) => (
							<ShopProductTile
								key={item._id}
								product={item}
								fromSearch={true}
								handleProductDetails={handleProductDetails}
							/>
					  ))
					: null}
			</div>
			<ProductDetails
				product={productDetails}
				openProductDetails={openProductDetails}
				setOpenProductDetails={setOpenProductDetails}
				handleAddToCart={handleAddToCart}
			/>
		</div>
	);
}

export default Search;
