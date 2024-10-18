export const registerFormControls = [
	{
		name: 'username',
		label: 'Name',
		placeholder: 'Name',
		componentType: 'input',
		type: 'text',
	},
	{
		name: 'email',
		label: 'Email',
		placeholder: 'Email',
		componentType: 'input',
		type: 'email',
	},
	{
		name: 'password',
		label: 'Password',
		placeholder: 'Password',
		componentType: 'input',
		type: 'password',
	},
];

export const loginFormControls = [
	{
		name: 'email',
		label: 'Email',
		placeholder: 'Email',
		componentType: 'input',
		type: 'email',
	},
	{
		name: 'password',
		label: 'Password',
		placeholder: 'Password',
		componentType: 'input',
		type: 'password',
	},
];

export const addProductFormElements = [
	{
		label: 'Title',
		name: 'title',
		componentType: 'input',
		type: 'text',
		placeholder: 'Title',
	},
	{
		label: 'Description',
		name: 'description',
		componentType: 'textarea',
		placeholder: 'Description',
	},
	{
		label: 'Category',
		name: 'category',
		componentType: 'select',
		options: [
			{ id: 'men', label: 'Men' },
			{ id: 'women', label: 'Women' },
			{ id: 'kids', label: 'Kids' },
			{ id: 'accessories', label: 'Accessories' },
			{ id: 'footwear', label: 'Footwear' },
		],
	},
	{
		label: 'Brand',
		name: 'brand',
		componentType: 'select',
		options: [
			{ id: 'nike', label: 'Nike' },
			{ id: 'adidas', label: 'Adidas' },
			{ id: 'puma', label: 'Puma' },
			{ id: 'levi', label: "Levi's" },
			{ id: 'zara', label: 'Zara' },
			{ id: 'h&m', label: 'H&M' },
		],
	},
	{
		label: 'Price',
		name: 'price',
		componentType: 'input',
		type: 'number',
		placeholder: 'Price',
	},
	{
		label: 'Sale Price',
		name: 'salePrice',
		componentType: 'input',
		type: 'number',
		placeholder: 'Sale Price (Optional)',
	},
	{
		label: 'Total Stock',
		name: 'totalStock',
		componentType: 'input',
		type: 'number',
		placeholder: 'Total Stock',
	},
];

export const shopHeaderMenuItems = [
	{
		id: 'home',
		label: 'Home',
		path: '/shop/home',
	},
	{
		id: 'products',
		label: 'Products',
		path: '/shop/products',
	},
	{
		id: 'men',
		label: 'Men',
		path: '/shop/products',
	},
	{
		id: 'women',
		label: 'Women',
		path: '/shop/products',
	},
	{
		id: 'kids',
		label: 'Kids',
		path: '/shop/products',
	},
	{
		id: 'accessories',
		label: 'Accessories',
		path: '/shop/products',
	},
	{
		id: 'footwear',
		label: 'Footwear',
		path: '/shop/products',
	},
	{
		id: 'search',
		label: 'Search',
		path: '/shop/search',
	},
];

export const categoryOptionsMap = {
	men: 'Men',
	women: 'Women',
	kids: 'Kids',
	accessories: 'Accessories',
	footwear: 'Footwear',
};

export const brandOptionsMap = {
	nike: 'Nike',
	adidas: 'Adidas',
	puma: 'Puma',
	levi: "Levi'S",
	zara: 'Zara',
	'h&m': 'H&M',
};

export const filterOptions = {
	Category: [
		{ id: 'men', label: 'Men' },
		{ id: 'women', label: 'Women' },
		{ id: 'kids', label: 'Kids' },
		{ id: 'accessories', label: 'Accessories' },
		{ id: 'footwear', label: 'Footwear' },
	],
	Brand: [
		{ id: 'nike', label: 'Nike' },
		{ id: 'adidas', label: 'Adidas' },
		{ id: 'puma', label: 'Puma' },
		{ id: 'levi', label: "Levi's" },
		{ id: 'zara', label: 'Zara' },
		{ id: 'h&m', label: 'H&M' },
	],
};

export const sortOptions = [
	{ id: 'price-lowtohigh', label: 'Price: Low to High' },
	{ id: 'price-hightolow', label: 'Price: High to Low' },
	{ id: 'title-atoz', label: 'Title: A to Z' },
	{ id: 'title-ztoa', label: 'Title: Z to A' },
];

export const addressFormControls = [
	{
		label: 'Address',
		name: 'address',
		componentType: 'input',
		type: 'text',
		placeholder: 'Address',
	},
	{
		label: 'City',
		name: 'city',
		componentType: 'input',
		type: 'text',
		placeholder: 'City',
	},
	{
		label: 'State',
		name: 'state',
		componentType: 'input',
		type: 'text',
		placeholder: 'State',
	},
	{
		label: 'Pincode',
		name: 'pincode',
		componentType: 'input',
		type: 'text',
		placeholder: 'Pincode',
	},
	{
		label: 'Contact Number',
		name: 'phone',
		componentType: 'input',
		type: 'text',
		placeholder: 'Contact Number',
	},
	{
		label: 'Additional Notes',
		name: 'notes',
		componentType: 'textarea',
		placeholder: 'Any Additional Notes',
	},
];
