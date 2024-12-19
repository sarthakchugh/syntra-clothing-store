import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    addresses: [],
};

export const addNewAddress = createAsyncThunk('/address/add', async ({ userId, formData }) => {
    const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shop/address/add`,
        {
            userId,
            ...formData,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')),
            },
        }
    );
    return response?.data;
});

export const getAllAddress = createAsyncThunk('/address', async (userId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shop/address/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')),
        },
    });
    return response?.data;
});

export const updateAddress = createAsyncThunk('/address/update', async ({ addressId, formData }) => {
    const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/shop/address/update`,
        {
            addressId,
            ...formData,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')),
            },
        }
    );
    return response?.data;
});

export const deleteAddress = createAsyncThunk('/address/delete', async (addressId) => {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/shop/address/${addressId}`, {
        headers: {
            Authorization: 'Bearer ' + JSON.parse(sessionStorage.getItem('token')),
        },
    });
    return response?.data;
});

const ShopAddressSlice = createSlice({
    name: 'shopAddress',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addresses = action.payload.data;
            })
            .addCase(getAllAddress.rejected, (state) => {
                state.isLoading = false;
                state.addresses = [];
            });
    },
});

export default ShopAddressSlice.reducer;
