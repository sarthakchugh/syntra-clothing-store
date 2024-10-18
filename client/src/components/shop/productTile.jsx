/* eslint-disable react/prop-types */
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { brandOptionsMap, categoryOptionsMap } from '../../config/index';

function ShopProductTile({ product, handleProductDetails, handleAddToCart, fromSearch = false }) {
	return (
		<Card className='w-full max-w-sm mx-auto'>
			<div
				className={`${fromSearch ? '' : 'cursor-pointer'}`}
				onClick={fromSearch ? () => {} : () => handleProductDetails(product._id)}
			>
				<div className='relative'>
					<img
						src={product?.image}
						alt={product?.title}
						className='w-full h-[250px] object-cover rounded-t-lg'
					/>
					{product?.salePrice > 0 && product?.totalStock >= 6 ? (
						<Badge className={'absolute top-2 left-2 bg-red-500 hover:bg-red-600'}>Sale</Badge>
					) : product?.totalStock < 6 && product?.totalStock > 0 ? (
						<Badge className={'absolute top-2 left-2  bg-red-500 hover:bg-red-600'}>
							{`Hurry! Only ${product?.totalStock} left!`}
						</Badge>
					) : product?.totalStock === 0 ? (
						<Badge className={'absolute top-2 left-2'}>Sold Out</Badge>
					) : null}
				</div>
				<CardContent className='p-4'>
					<h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
					<div className='flex justify-between items-center mb-2'>
						<span className='text-sm text-muted-foreground'>{categoryOptionsMap[product?.category]}</span>
						<span className='text-sm text-muted-foreground'>{brandOptionsMap[product?.brand]}</span>
					</div>
					<div className='flex gap-2 items-center mb-2'>
						<span className={`${product?.salePrice > 0 ? '' : 'hidden'} text-lg font-bold`}>
							${product.salePrice}
						</span>
						<span
							className={`${
								product?.salePrice > 0 ? 'line-through font-semibold' : 'font-bold'
							} text-lg  text-primary`}
						>
							${product.price}
						</span>
					</div>
				</CardContent>
			</div>
			<CardFooter>
				<Button
					onClick={
						fromSearch
							? () => handleProductDetails(product._id)
							: () => handleAddToCart(product?._id, product?.totalStock)
					}
					className='w-full'
					disabled={fromSearch ? false : product?.totalStock === 0}
				>
					{fromSearch ? 'View Product' : product?.totalStock > 0 ? 'Add to Cart' : 'Out of Stock'}
				</Button>
			</CardFooter>
		</Card>
	);
}

export default ShopProductTile;
