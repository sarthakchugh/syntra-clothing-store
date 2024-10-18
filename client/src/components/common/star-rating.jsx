import { StarIcon } from 'lucide-react';

function StarRating({ rating, onChange }) {
	const ratingArray = [];
	for (let i = 0; i < rating; i++) {
		ratingArray.push(i);
	}
	return onChange
		? [1, 2, 3, 4, 5].map((star) => (
				<StarIcon
					key={star}
					className={`${star <= rating ? 'fill-yellow-500' : ''} h-7 w-7 cursor-pointer`}
					onClick={() => onChange(star)}
				/>
		  ))
		: ratingArray.map((star) => <StarIcon key={star} className={`w-5 h-5 fill-primary`} />);
}

export default StarRating;
