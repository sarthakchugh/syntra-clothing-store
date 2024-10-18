import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: false,
		isLoading: true,
		user: null,
		token: null,
	},
	reducers: {
		resetToken: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.isLoading = false;
			})
			.addCase(registerUser.rejected, (state) => {
				state.isAuthenticated = false;
				state.isLoading = false;
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isAuthenticated = action.payload.success;
				state.isLoading = false;
				state.user = action.payload.success ? action.payload.user : null;
				state.token = action.payload.token;
				sessionStorage.setItem('token', JSON.stringify(action.payload.token));
			})
			.addCase(loginUser.rejected, (state) => {
				state.isAuthenticated = false;
				state.isLoading = false;
				state.user = null;
				state.token = null;
			})
			// .addCase(logoutUser.fulfilled, (state) => {
			// 	state.isAuthenticated = false;
			// 	state.isLoading = false;
			// 	state.user = null;
			// })
			.addCase(checkAuth.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.isAuthenticated = action.payload.success;
				state.isLoading = false;
				state.user = action.payload.success ? action.payload.user : null;
			})
			.addCase(checkAuth.rejected, (state) => {
				state.isAuthenticated = false;
				state.isLoading = false;
				state.user = null;
			});
	},
});

export const registerUser = createAsyncThunk('/auth/register', async (formData) => {
	const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData, {
		withCredentials: true,
	});

	return response.data;
});

export const loginUser = createAsyncThunk('/auth/login', async (formData) => {
	const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData, {
		withCredentials: true,
	});

	return response.data;
});

// Render doesn't support setting cookies
// export const logoutUser = createAsyncThunk('/auth/logout', async () => {
// 	const response = await axios.post(
// 		`${import.meta.env.VITE_API_URL}/api/auth/logout`,
// 		{},
// 		{
// 			withCredentials: true,
// 		}
// 	);

// 	return response.data;
// });

export const checkAuth = createAsyncThunk('/auth/checkAuth', async (token) => {
	const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/authenticate`, {
		withCredentials: true,
		headers: {
			Authorization: 'Bearer ' + token,
			'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
		},
	});

	return response.data;
});

export const { resetToken } = authSlice.actions;
export default authSlice.reducer;
