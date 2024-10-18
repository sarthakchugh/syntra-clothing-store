import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	isLoading: false,
	productList: [],
	productDetails: null,
};

export const fetchProducts = createAsyncThunk('/products', async ({ filterParams, sortParams }) => {
	const query = new URLSearchParams({ ...filterParams, sortBy: sortParams });
	const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products?${query}`);
	return response?.data;
});

export const fetchProductDetails = createAsyncThunk('/products/productDetails', async (id) => {
	const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/products/${id}`);
	return response?.data;
});

const ShopProductSlice = createSlice({
	name: 'shopProducts',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.productList = action.payload.data;
			})
			.addCase(fetchProducts.rejected, (state) => {
				state.isLoading = false;
				state.productList = [];
			})
			.addCase(fetchProductDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProductDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.productDetails = action.payload.data;
			})
			.addCase(fetchProductDetails.rejected, (state) => {
				state.isLoading = false;
				state.productDetails = null;
			});
	},
});

export default ShopProductSlice.reducer;
