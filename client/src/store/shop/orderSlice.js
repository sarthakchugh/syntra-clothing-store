import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    approvalURL: '',
    orders: [],
    orderId: '',
    order: null,
};

export const createOrder = createAsyncThunk('/order/add', async (orderData) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/order/add`, orderData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')),
        },
    });
    return response?.data;
});

export const capturePayment = createAsyncThunk('/order/payment', async (paymentData) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/shop/order/payment`, paymentData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')),
        },
    });
    return response?.data;
});

export const getAllOrders = createAsyncThunk('/order/user', async (userId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/user/${userId}`, {
        headers: { Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')) },
    });
    return response?.data;
});

export const getOrderDetails = createAsyncThunk('/order', async (orderId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/order/${orderId}`, {
        headers: { Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')) },
    });
    return response?.data;
});

export const cancelOrder = createAsyncThunk('/order/cancel', async (orderId) => {
    const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/shop/order/${orderId}`,
        {},
        {
            headers: { Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')) },
        }
    );
    return response?.data;
});

const ShopOrderSlice = createSlice({
    name: 'shopOrder',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.approvalURL = action.payload.approvalURL;
                state.orderId = action.payload.data;
                sessionStorage.setItem('orderId', action.payload.data);
            })
            .addCase(createOrder.rejected, (state) => {
                state.isLoading = false;
                state.approvalURL = '';
                state.orderId = '';
            })
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action?.payload?.data;
            })
            .addCase(getAllOrders.rejected, (state) => {
                state.isLoading = false;
                state.orders = [];
            })
            .addCase(capturePayment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(capturePayment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action?.payload?.data;
            })
            .addCase(capturePayment.rejected, (state) => {
                state.isLoading = false;
                state.order = null;
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action?.payload?.data;
            })
            .addCase(getOrderDetails.rejected, (state) => {
                state.isLoading = false;
                state.order = null;
            });
    },
});

export default ShopOrderSlice.reducer;
