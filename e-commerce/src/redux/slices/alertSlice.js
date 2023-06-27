import { createSlice } from '@reduxjs/toolkit';
import { login, logout, signup } from './authSlice';
import { getCart, saveCart } from './cartSlice';

const initialState = {
    open: false,
    severity: null,
    message: null
};


const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        success(state, { payload }) {
            state.open = true;
            state.severity = 'success';
            state.message = payload;
        },
        failure(state, { payload }) {
            state.open = true;
            state.severity = 'error';
            state.message = payload;
        },
        warning(state, { payload }) {
            state.open = true;
            state.severity = 'warning';
            state.message = payload;
        },
        info(state, { payload }) {
            state.open = true;
            state.severity = 'info';
            state.message = payload;
        },
        close(state) {
            state.open = false;
            state.severity = null;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.open = true;
            state.severity = 'success';
            state.message = payload.message;
        });

        builder.addCase(signup.fulfilled, (state, { payload }) => {
            state.open = true;
            state.severity = 'success';
            state.message = payload.message;
        });

        builder.addCase(logout.fulfilled, (state, { payload }) => {
            state.open = true;
            state.severity = 'success';
            state.message = payload.message;
        });

        builder.addCase(saveCart.fulfilled, (state, { payload }) => {
            state.open = true;
            state.severity = 'success';
            state.message = payload.message;
        });

        builder.addCase(saveCart.rejected, (state, { payload }) => {
            state.open = true;
            state.severity = 'error';
            state.message = payload.message;
        });

        builder.addCase(getCart.rejected, (state, { payload }) => {
            state.open = true;
            state.severity = 'error';
            state.message = payload.message;
        });

        builder.addCase(logout.rejected, (state, { payload }) => {
            state.open = true;
            state.severity = 'error';
            state.message = payload.message;
        });

        builder.addCase(signup.rejected, (state, { payload }) => {
            state.open = true;
            state.severity = 'error';
            state.message = payload.message;
        });

        builder.addCase(login.rejected, (state, { payload }) => {
            state.open = true;
            state.severity = 'error';
            state.message = payload.message;
        });
    }
});

export const { success, failure, warning, info, close } = alertSlice.actions;

export default alertSlice.reducer;