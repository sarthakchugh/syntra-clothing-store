import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react';
import { ChartNoAxesCombined } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';

const adminSidebarMenuItems = [
	{
		id: 'dashboard',
		label: 'Dashboard',
		path: '/admin/dashboard',
		icon: <LayoutDashboard />,
	},
	{
		id: 'products',
		label: 'Products',
		path: '/admin/products',
		icon: <Package />,
	},
	{
		id: 'orders',
		label: 'Orders',
		path: '/admin/orders',
		icon: <ShoppingCart />,
	},
];

function MenuItems({ setOpen }) {
	const navigate = useNavigate();
	return (
		<nav className='mt-8 flex-col flex gap-2'>
			{adminSidebarMenuItems.map((menuItem) => (
				<div
					className='flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground'
					key={menuItem.id}
					onClick={() => {
						navigate(menuItem.path);
						setOpen ? setOpen(false) : null;
					}}
				>
					{menuItem.icon}
					<span>{menuItem.label}</span>
				</div>
			))}
		</nav>
	);
}

function AdminSidebar({ open, setOpen }) {
	const navigate = useNavigate();
	return (
		<>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent side='left' className='w-64'>
					<div className='flex flex-col h-full'>
						<SheetHeader className='border-b'>
							<SheetDescription />
							<SheetTitle className='flex gap-2 mt-5 mb-5'>
								<ChartNoAxesCombined size={30} />
								<h2 className='text-xl font-extrabold'>Admin Panel</h2>
							</SheetTitle>
						</SheetHeader>
						<MenuItems setOpen={setOpen} />
					</div>
				</SheetContent>
			</Sheet>
			<aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
				<div
					className='flex items-center gap-2 cursor-pointer'
					onClick={() => {
						navigate('/admin/dashboard');
					}}
				>
					<ChartNoAxesCombined size={30} />
					<h1 className='text-xl font-extrabold'>Admin Panel</h1>
				</div>
				<MenuItems />
			</aside>
		</>
	);
}

export default AdminSidebar;
