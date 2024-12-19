import { Outlet } from 'react-router-dom';

function AuthLayout(props) {
	return (
		<div className='flex flex-col lg:flex-row min-h-screen w-full'>
			<div className='flex items-center justify-center bg-black lg:w-1/2 px-12 h-[40vh] md:h-[50vh] lg:h-screen'>
				<div className='max-w-md space-y-6 text-center text-primary-foreground'>
					<h1 className='text-4xl font-extrabold tracking-tight'>Welcome to Syntra</h1>
				</div>
			</div>
			<div className='flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
				<Outlet />
			</div>
		</div>
	);
}

export default AuthLayout;
