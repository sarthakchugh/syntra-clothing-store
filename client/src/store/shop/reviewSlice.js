import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    reviews: [],
    message: '',
};

export const addReview = createAsyncThunk('/review/add', async (review) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/review/add`, review, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')),
        },
    });
    return response?.data;
});

export const getReviews = createAsyncThunk('/review', async (productId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/review/${productId}`, {
        headers: { Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')) },
    });
    return response?.data;
});

const ShopReviewSlice = createSlice({
    name: 'shopReview',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReviews.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.isLoading = false;
                state.reviews = action.payload.data;
            })
            .addCase(getReviews.rejected, (state) => {
                state.isLoading = false;
                state.reviews = [];
            })
            .addCase(addReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addReview.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addReview.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action?.payload?.message;
            });
    },
});

export default ShopReviewSlice.reducer;
