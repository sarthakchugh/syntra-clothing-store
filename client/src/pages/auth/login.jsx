import { Link } from 'react-router-dom';
import { useState } from 'react';
import Form from '@/components/common/form';
import { loginFormControls } from '@/config';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/store/authSlice';
import { useToast } from '@/hooks/use-toast';

const initialState = {
	email: '',
	password: '',
};

function Login() {
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	const { toast } = useToast();

	function onSubmit(e) {
		e.preventDefault();
		dispatch(loginUser(formData)).then((data) => {
			if (data?.payload?.success) {
				toast({
					variant: 'success',
					title: 'Success!',
					description: 'User logged in successfully.',
				});
			} else {
				toast({
					variant: 'destructive',
					title: 'Error!',
					description: data?.payload?.message,
				});
			}
		});
	}
	return (
		<div className='mx-auto w-full max-w-md space-y-6'>
			<div className='text-center'>
				<h1 className='text-3xl font-bold tracking-tight text-foreground'>Login to your account</h1>
				<p>
					Don't have an account?
					<Link to='/auth/register' className='font-medium ml-2 text-primary hover:underline'>
						Register
					</Link>
				</p>
			</div>
			<Form
				formControls={loginFormControls}
				buttonText={'Login'}
				formData={formData}
				setFormData={setFormData}
				onSubmit={onSubmit}
			/>
		</div>
	);
}

export default Login;
