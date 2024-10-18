import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
	getLeastStockedProducts,
	getMostOrderedProducts,
	getOrdersByCategory,
	getSalesData,
} from '@/store/admin/dashboardSlice';
import { capitalizeFirstLetter } from '@/util/uiFormatter';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Cell, Label, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0082'];

function AdminDashboard() {
	const chartConfig = {
		sales: {
			label: 'Sales',
			color: '#2563eb',
		},
	};
	const dispatch = useDispatch();
	const { salesData, mostOrdered, leastStock, ordersByCategory } = useSelector(
		(state) => state.adminDashboard
	);

	useEffect(() => {
		dispatch(getSalesData());
		dispatch(getMostOrderedProducts());
		dispatch(getLeastStockedProducts());
		dispatch(getOrdersByCategory());
	}, [dispatch]);

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
			<Card>
				<CardHeader>
					<CardTitle>Monthly Sales</CardTitle>
					<CardDescription className='sr-only' />
					<CardContent className='mt-2'>
						<ChartContainer config={chartConfig} className='min-h-[100px] w-full'>
							<BarChart accessibilityLayer data={salesData}>
								<CartesianGrid />
								<XAxis
									dataKey='month'
									tickLine={false}
									tickMargin={10}
									axisLine={false}
									tickFormatter={(value) => value.slice(0, 3)}
								/>
								<YAxis dataKey='sales'>
									<Label className='font-bold' value='Sales (in USD)' angle={-90} position='insideLeft' />
								</YAxis>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Bar dataKey='sales' fill='var(--color-sales)' radius={4} />
							</BarChart>
						</ChartContainer>
					</CardContent>
				</CardHeader>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Most Ordered Products</CardTitle>
					<CardDescription className='sr-only' />
					<CardContent>
						{mostOrdered && mostOrdered.length > 0 ? (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Product</TableHead>
										<TableHead>Price</TableHead>
										<TableHead className='text-right'>Orders</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{mostOrdered.map((orderItem) => (
										<TableRow key={orderItem._id} className='font-semibold'>
											<TableCell>{orderItem.title}</TableCell>
											<TableCell>${orderItem.price}</TableCell>
											<TableCell className='text-right'>{orderItem.orderCount}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						) : (
							<div>
								<span>You don't have any orders yet.</span>
							</div>
						)}
					</CardContent>
				</CardHeader>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Products with Least Stock</CardTitle>
					<CardDescription className='sr-only' />
					<CardContent>
						{leastStock && leastStock.length > 0 ? (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Product ID</TableHead>
										<TableHead>Name</TableHead>
										<TableHead className='text-right'>Stock Left</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{leastStock.map((orderItem) => (
										<TableRow key={orderItem._id} className='font-semibold'>
											<TableCell>{orderItem._id}</TableCell>
											<TableCell>{orderItem.title}</TableCell>
											<TableCell className='text-right'>{orderItem.totalStock}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						) : (
							<div>
								<span>You don't have any orders yet.</span>
							</div>
						)}
					</CardContent>
				</CardHeader>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Orders by Category</CardTitle>
					<CardDescription className='sr-only' />
					<ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
						<PieChart>
							<Pie
								data={ordersByCategory}
								cx={'50%'}
								cy={'50%'}
								labelLine={true}
								label={({ name }) => {
									return capitalizeFirstLetter(name);
								}}
								outerRadius={120}
								innerRadius={60}
								fill='#8884d8'
								dataKey='orderCount'
								nameKey='category'
								className='font-bold'
							>
								{ordersByCategory.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<ChartTooltip content={<ChartTooltipContent />} />
						</PieChart>
					</ChartContainer>
				</CardHeader>
			</Card>
		</div>
	);
}

export default AdminDashboard;
