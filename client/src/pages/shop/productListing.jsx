import ProductFilter from '@/components/shop/filter';
import ProductDetails from '@/components/shop/productDetails';
import ShopProductTile from '@/components/shop/productTile';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { sortOptions } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { addToCart } from '@/store/shop/cartSlice';
import { fetchProductDetails, fetchProducts } from '@/store/shop/productSlice';
import { ArrowUpDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

// todo: Helper function to add query params
function createSearchParams(filters) {
	const queryParams = [];
	for (const [key, value] of Object.entries(filters)) {
		if (Array.isArray(value) && value.length > 0) {
			const paramValue = value.join(',');
			queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
		}
	}
	return queryParams.join('&');
}

function ProductListing() {
	const dispatch = useDispatch();
	const { productList, productDetails } = useSelector((state) => state.shopProducts);
	const { user } = useSelector((state) => state.auth);
	const { cartItems } = useSelector((state) => state.shopCart);
	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const [openProductDetails, setOpenProductDetails] = useState(false);
	const { toast } = useToast();
	const categorySearchParam = searchParams.get('category');

	useEffect(() => {
		setSort('price-lowtohigh'); // Setting default Sort Option
		setFilters(JSON.parse(sessionStorage.getItem('filters')) || {}); // Setting filters from session storage
	}, [categorySearchParam]);

	useEffect(() => {
		if (filters !== null && sort !== null) {
			dispatch(fetchProducts({ filterParams: filters, sortParams: sort })); // Get products
		}
	}, [dispatch, filters, sort, user]);

	// ! Only to add params to the URL in browser.
	useEffect(() => {
		if (filters && Object.keys(filters).length > 0) {
			const queryString = createSearchParams(filters);
			setSearchParams(new URLSearchParams(queryString));
		}
	}, [filters, setSearchParams]);

	function handleSort(value) {
		setSort(value);
	}

	function handleFilter(category, currentOption) {
		const sectionId = category.toLowerCase();
		let cpyFilters = { ...filters };
		const sectionIndex = Object.keys(cpyFilters).indexOf(sectionId);
		if (sectionIndex === -1) {
			cpyFilters = { ...cpyFilters, [sectionId]: [currentOption] };
		} else {
			const optionIndex = cpyFilters[sectionId].indexOf(currentOption);
			if (optionIndex === -1) {
				cpyFilters[sectionId].push(currentOption);
			} else {
				cpyFilters[sectionId].splice(optionIndex, 1);
			}
		}

		setFilters(cpyFilters);
		sessionStorage.setItem('filters', JSON.stringify(cpyFilters));
	}

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
		<div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 px-4 md:px-6'>
			<ProductFilter filters={filters} onFilter={handleFilter} />
			<div className='bg-background w-full rounded-lg shadow-sm'>
				<div className='p-4 border-b flex items-center justify-between'>
					<h2 className='text-lg font-bold'>All Products</h2>
					<div className='flex items-center gap-3'>
						<span className='text-muted-foreground'>
							{productList?.length || 0} product{productList.length > 1 && 's'}
						</span>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='outline' size='sm' className='flex items-center gap-1'>
									<ArrowUpDownIcon className='h-4 w-4' />
									Sort By
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-[200px]'>
								<DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
									{sortOptions.map((sortItem) => (
										<DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
											{sortItem.label}
										</DropdownMenuRadioItem>
									))}
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
					{productList && productList.length > 0
						? productList.map((productItem) => (
								<ShopProductTile
									key={productItem._id}
									product={productItem}
									handleProductDetails={handleProductDetails}
									handleAddToCart={handleAddToCart}
								/>
						  ))
						: null}
				</div>
			</div>
			<ProductDetails
				product={productDetails}
				openProductDetails={openProductDetails}
				setOpenProductDetails={setOpenProductDetails}
				handleAddToCart={handleAddToCart}
				handleProductDetails={handleProductDetails}
			/>
		</div>
	);
}

export default ProductListing;
