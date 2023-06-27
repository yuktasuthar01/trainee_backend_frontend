import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './slices/alertSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import queryReducer from './slices/querySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        alert: alertReducer,
        cart: cartReducer,
        query: queryReducer
    }
});