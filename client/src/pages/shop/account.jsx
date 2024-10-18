import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import banner from '../../assets/garments-apparels-banner.jpg';
import Order from '@/components/shop/order';
import Address from '@/components/shop/address';

function Account() {
	return (
		<div className='flex flex-col'>
			<div className='relative h-[300px] w-full overflow-hidden'>
				<img src={banner} alt='banner-image' className='h-full w-full object-cover object-center' />
			</div>
			<div className='container mx-auto grid grid-cols-1 gap-8 lg:px-6 py-6'>
				<div className='flex flex-col border bg-background p-6 shadow-sm  rounded-lg'>
					<Tabs defaultValue='orders'>
						<TabsList>
							<TabsTrigger value='orders'>Orders</TabsTrigger>
							<TabsTrigger value='address'>Address</TabsTrigger>
						</TabsList>
						<TabsContent value='orders'>
							<Order />
						</TabsContent>
						<TabsContent value='address'>
							<Address />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}

export default Account;
