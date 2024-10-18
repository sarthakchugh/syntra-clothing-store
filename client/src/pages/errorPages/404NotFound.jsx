import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function NotFound404() {
	const navigate = useNavigate();
	return (
		<div className='w-full h-full overflow-hidden'>
			<div className='flex flex-col gap-4 items-center mt-5'>
				<span className='text-xl font-bold'>Error 404: Requested Page could not be found!</span>
				<Button onClick={() => navigate('/auth/login')}>Go to Home</Button>
			</div>
		</div>
	);
}

export default NotFound404;
