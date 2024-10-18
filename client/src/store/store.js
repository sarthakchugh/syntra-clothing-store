import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminProductReducer from './admin/productSlice';
import shopProductReducer from './shop/productSlice';
import shopCartReducer from './shop/cartSlice';
import shopAddressReducer from './shop/addressSlice';
import shopOrderReducer from './shop/orderSlice';
import adminOrderReducer from './admin/orderSlice';
import shopSearchReducer from './shop/searchSlice';
import shopReviewReducer from './shop/reviewSlice';
import adminDashboardReducer from './admin/dashboardSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		adminProducts: adminProductReducer,
		shopProducts: shopProductReducer,
		shopCart: shopCartReducer,
		shopAddress: shopAddressReducer,
		shopOrder: shopOrderReducer,
		adminOrder: adminOrderReducer,
		shopSearch: shopSearchReducer,
		shopReview: shopReviewReducer,
		adminDashboard: adminDashboardReducer,
	},
});

export default store;
