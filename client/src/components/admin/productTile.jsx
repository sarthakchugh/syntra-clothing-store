import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';

function AdminProductTile({
	product,
	setCurrentEdittedId,
	setOpenNewProductSidebar,
	setFormData,
	handleDelete,
}) {
	return (
		<Card className='w-full max-w-sm mx-auto'>
			<div>
				<div className='relative'>
					<img
						src={product?.image}
						alt={product?.title}
						className='w-full h-[300px] object-cover rounded-t-lg'
					/>
				</div>
				<CardContent>
					<h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
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
				<CardFooter className='flex items-center gap-2 justify-end'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => {
							setOpenNewProductSidebar(true);
							setCurrentEdittedId(product?._id);
							setFormData(product);
						}}
					>
						Edit
					</Button>
					<Button variant='destructive' size='sm' onClick={() => handleDelete(product?._id)}>
						{' '}
						Delete{' '}
					</Button>
				</CardFooter>
			</div>
		</Card>
	);
}

export default AdminProductTile;
