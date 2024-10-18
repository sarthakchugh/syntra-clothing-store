import { AlignJustify, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { resetToken } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';

function AdminHeader({ setOpen }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleLogout() {
		// dispatch(logoutUser());
		dispatch(resetToken());
		sessionStorage.clear();
		navigate('/auth/login');
	}
	return (
		<header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
			<Button className='lg:hidden sm:block' onClick={() => setOpen(true)}>
				<AlignJustify />
				<span className='sr-only'>Toggle Menu</span>
			</Button>
			<div className='flex flex-1 justify-end'>
				<Button
					className='inline-flex gap-2 items-center rounded-md px-4 py2 text-sm font-medium shadow'
					onClick={handleLogout}
				>
					<LogOut />
					Logout
				</Button>
			</div>
		</header>
	);
}

export default AdminHeader;