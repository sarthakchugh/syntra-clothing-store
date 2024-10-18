import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	isLoading: false,
	salesData: [],
	mostOrdered: [],
	leastStock: [],
	ordersByCategory: [],
};

// todo: Add New Product Async Thunk
export const getSalesData = createAsyncThunk('/dashboard/sales', async () => {
	const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard/salesData`);
	return response?.data;
});

// todo: Fetch All Products Async Thunk
export const getMostOrderedProducts = createAsyncThunk('/dashboard/mostOrdered', async () => {
	const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard/mostOrdered`);
	return response?.data;
});

// todo: Edit a product Async Thunk
export const getLeastStockedProducts = createAsyncThunk('/dashboard/leastStock', async () => {
	const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard/leastStock`);
	return response?.data;
});

// todo: Delete a product Async Thunk
export const getOrdersByCategory = createAsyncThunk('/dashboard/categoryOrdered', async () => {
	const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard/categoryOrdered`);
	return response?.data;
});

const AdminDashboardSlice = createSlice({
	name: 'adminDashboard',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getSalesData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSalesData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.salesData = action.payload.data;
			})
			.addCase(getSalesData.rejected, (state) => {
				state.isLoading = false;
				state.salesData = [];
			})
			.addCase(getMostOrderedProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMostOrderedProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.mostOrdered = action.payload.data;
			})
			.addCase(getMostOrderedProducts.rejected, (state) => {
				state.isLoading = false;
				state.mostOrdered = [];
			})
			.addCase(getLeastStockedProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getLeastStockedProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.leastStock = action.payload.data;
			})
			.addCase(getLeastStockedProducts.rejected, (state) => {
				state.isLoading = false;
				state.leastStock = [];
			})
			.addCase(getOrdersByCategory.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrdersByCategory.fulfilled, (state, action) => {
				state.isLoading = false;
				state.ordersByCategory = action.payload.data;
			})
			.addCase(getOrdersByCategory.rejected, (state) => {
				state.isLoading = false;
				state.ordersByCategory = [];
			});
	},
});

export default AdminDashboardSlice.reducer;
