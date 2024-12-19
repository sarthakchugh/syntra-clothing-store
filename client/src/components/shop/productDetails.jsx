/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from '../ui/badge';
import StarRating from '../common/star-rating';
import { useEffect, useState } from 'react';
import { addReview, getReviews } from '@/store/shop/reviewSlice';
import { useToast } from '@/hooks/use-toast';

function ProductDetails({
	product,
	openProductDetails,
	setOpenProductDetails,
	handleAddToCart,
	handleProductDetails,
}) {
	const { user } = useSelector((state) => state.auth);
	const [reviewMessage, setReviewMessage] = useState('');
	const [rating, setRating] = useState(0);
	const dispatch = useDispatch();
	const { toast } = useToast();
	const { reviews } = useSelector((state) => state.shopReview);

	useEffect(() => {
		if (product !== null) {
			dispatch(getReviews(product?._id));
		}
	}, [product, dispatch]);

	function handleRatingChange(star) {
		setRating(star);
	}

	function handleAddReview() {
		dispatch(addReview({ userId: user?.id, productId: product?._id, reviewMessage, rating })).then((data) => {
			if (data?.payload?.success) {
				toast({
					variant: 'success',
					title: 'Thank You!',
					description: 'Your review has been added.',
				});
				setRating(0);
				setReviewMessage('');
				dispatch(getReviews(product?._id));
				handleProductDetails(product?._id);
			} else {
				toast({
					variant: 'destructive',
					title: 'Uh oh! There seems to be a problem',
					description: data?.payload?.message,
				});
			}
		});
	}

	return (
		<Dialog
			open={openProductDetails}
			onOpenChange={() => {
				setOpenProductDetails(false);
				setReviewMessage('');
				setRating(0);
			}}
		>
			<DialogTitle className='sr-only'>Product Details</DialogTitle>
			<DialogDescription className='sr-only'>Product Details</DialogDescription>
			<DialogContent className='grid md:grid-cols-2 gap-8 p-4 lg:p-6 max-w-[95vw] lg:max-w-[70vw] rounded-lg'>
				<div className='relative overflow-hidden rounded-lg'>
					<img
						src={product?.image}
						alt={product?.title}
						width={600}
						height={600}
						className='aspect-square w-full object-cover'
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
				<div className='flex flex-col gap-4'>
					<div>
						<h1 className='text-3xl font-extrabold'>{product?.title}</h1>
						<p className='text-muted-foreground mt-1'>{product?.description}</p>
					</div>
					<div className='flex justify-between'>
						{product?.rating > 0 ? (
							<div className='flex items-center gap-2'>
								<div className='flex items-center gap-0.5'>
									<StarRating rating={Math.round(product?.rating)} />
								</div>
								<span className='text-muted-foreground'>({product?.rating})</span>
							</div>
						) : null}
						<div className='flex items-center gap-2'>
							<span className={`${product?.salePrice > 0 ? '' : 'hidden'} text-lg font-bold`}>
								${product?.salePrice}
							</span>
							<span
								className={`${
									product?.salePrice > 0 ? 'line-through font-semibold' : 'font-bold'
								} text-lg  text-primary`}
							>
								${product?.price}
							</span>
						</div>
					</div>
					<div className='flex justify-center'>
						<Button
							onClick={() => handleAddToCart(product?._id, product?.totalStock)}
							className='w-[75%]'
							disabled={product?.totalStock === 0}
						>
							{product?.totalStock > 0 ? 'Add to Cart' : 'Out of Stock'}
						</Button>
					</div>
					<Separator />
					<div className='max-h-[300px] overflow-auto'>
						<h2 className='text-xl font-bold mb-3'>Customer Reviews</h2>
						<div className='grid gap-6'>
							{reviews && reviews.length ? (
								reviews.map((review) => (
									<div className='flex gap-4' key={review?._id}>
										<Avatar className='w-10 h-10 border'>
											<AvatarFallback>{review?.userId?.username?.[0]}</AvatarFallback>
										</Avatar>
										<div>
											<div className='flex gap-3'>
												<div className='flex items-center gap-2'>
													<h3 className='font-bold text-md'>{review?.userId?.username}</h3>
												</div>
												<div className='flex items-center gap-0.5'>
													<StarRating rating={review?.rating} />
												</div>
											</div>
											<p className='text-muted-foreground text-sm italic'>"{review?.reviewMessage}"</p>
										</div>
									</div>
								))
							) : (
								<div>
									<span>This product has no reviews yet.</span>
								</div>
							)}
						</div>
						<div className='flex gap-2 mt-6'>
							<div>
								<Avatar className='w-10 h-10 border'>
									<AvatarFallback>{user?.name?.[0].toUpperCase()}</AvatarFallback>
								</Avatar>
							</div>
							<div className='flex flex-col gap-2 w-[70%]'>
								<div className='flex gap-1 mt-1'>
									<StarRating rating={rating} onChange={handleRatingChange} />
								</div>
								<Input
									name='reviewMessage'
									value={reviewMessage}
									onChange={(e) => setReviewMessage(e.target.value)}
									placeholder='Write a review..'
								/>
							</div>
							<div className='flex flex-col justify-end items-center'>
								<Button onClick={handleAddReview} disabled={reviewMessage.trim() === ''}>
									Submit
								</Button>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default ProductDetails;
