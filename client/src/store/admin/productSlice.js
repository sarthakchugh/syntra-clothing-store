import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	isLoading: false,
	productList: [],
};

// todo: Add New Product Async Thunk
export const addNewProduct = createAsyncThunk('/products/add', async (formData) => {
	const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/add`, formData, {
		headers: { 'Content-Type': 'application/json' },
	});
	return response?.data;
});

// todo: Fetch All Products Async Thunk
export const fetchAllProducts = createAsyncThunk('/products', async () => {
	const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/products`);
	return response?.data;
});

// todo: Edit a product Async Thunk
export const editProduct = createAsyncThunk('/products/edit', async ({ id, formData }) => {
	const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`, formData, {
		headers: { 'Content-Type': 'application/json' },
	});
	return response?.data;
});

// todo: Delete a product Async Thunk
export const deleteProduct = createAsyncThunk('/products/add', async (id) => {
	const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`);
	return response?.data;
});

const AdminProductSlice = createSlice({
	name: 'adminProducts',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.productList = action.payload.data;
			})
			.addCase(fetchAllProducts.rejected, (state) => {
				state.isLoading = false;
				state.productList = [];
			});
	},
});

export default AdminProductSlice.reducer;
