import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    cartItems: [],
};

export const addToCart = createAsyncThunk('/cart/add', async ({ userId, productId, quantity }) => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/cart/add`,
        { userId, productId, quantity },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')),
            },
        }
    );
    return response?.data;
});

export const getCartItems = createAsyncThunk('/cart', async (userId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/cart/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')),
        },
    });
    return response?.data;
});

export const updateCartItem = createAsyncThunk('/cart/update', async ({ userId, productId, quantity }) => {
    const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/shop/cart/update`,
        { userId, productId, quantity },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')),
            },
        }
    );
    return response?.data;
});

export const deleteCartItem = createAsyncThunk('/cart/delete', async ({ userId, productId }) => {
    const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/shop/cart/${userId}/${productId}`,
        {
            headers: {
                Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')),
            },
        }
    );
    return response?.data;
});

const ShopCartSlice = createSlice({
    name: 'shopCart',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data.items;
            })
            .addCase(getCartItems.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data.items;
            })
            .addCase(addToCart.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(updateCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data.items;
            })
            .addCase(updateCartItem.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload.data.items;
            })
            .addCase(deleteCartItem.rejected, (state) => {
                state.isLoading = false;
                state.cartItems = [];
            });
    },
});

export default ShopCartSlice.reducer;
