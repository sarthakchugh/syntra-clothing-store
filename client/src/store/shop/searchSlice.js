import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	isLoading: true,
	products: [],
};

export const searchProducts = createAsyncThunk('/search', async (keyword) => {
	const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/search/${keyword}`);
	return response?.data;
});

const ShopSearchSlice = createSlice({
	name: 'shopSearch',
	initialState: initialState,
	reducers: {
		resetSearch: (state) => {
			state.products = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(searchProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = action?.payload?.data;
			})
			.addCase(searchProducts.rejected, (state) => {
				state.isLoading = false;
				state.products = [];
			});
	},
});

export const { resetSearch } = ShopSearchSlice.actions;

export default ShopSearchSlice.reducer;
