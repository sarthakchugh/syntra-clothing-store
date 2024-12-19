import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    orders: [],
    order: null,
};

export const getAllOrders = createAsyncThunk('/order', async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/order`, {
        headers: { Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')) },
    });
    return response?.data;
});

export const getOrderDetails = createAsyncThunk('/order/details', async (orderId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/order/${orderId}`, {
        headers: { Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')) },
    });
    return response?.data;
});

export const updateOrderStatus = createAsyncThunk('/order/update', async ({ orderId, status }) => {
    const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/order/${orderId}`,
        { status },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')),
            },
        }
    );
    return response?.data;
});

const AdminOrderSlice = createSlice({
    name: 'adminOrder',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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

export default AdminOrderSlice.reducer;
