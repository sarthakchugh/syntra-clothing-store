import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Form from '@/components/common/form';
import { registerFormControls } from '@/config';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/store/authSlice';
import { useToast } from '@/hooks/use-toast';

const initialState = {
	username: '',
	email: '',
	password: '',
};

function Register() {
	const [formData, setFormData] = useState(initialState);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { toast } = useToast();

	function onSubmit(e) {
		e.preventDefault();
		dispatch(registerUser(formData)).then((data) => {
			if (data?.payload?.success) {
				console.log(data);
				toast({
					variant: 'success',
					title: 'Success!',
					description: 'User has been registered successfully.',
				});
				navigate('/auth/login');
			} else {
				console.log(data);
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
				<h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
				<p>
					Already have an account?
					<Link to='/auth/login' className='font-medium ml-2 text-primary hover:underline'>
						Login
					</Link>
				</p>
			</div>
			<Form
				formControls={registerFormControls}
				buttonText={'Sign Up'}
				formData={formData}
				setFormData={setFormData}
				onSubmit={onSubmit}
			/>
		</div>
	);
}

export default Register;
