import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCookies, fetchAPI } from '../../utils/dataFetching';

const cookies = fetchCookies();

const initialState = {
    loggedIn: !!cookies['auth-uid'],
    user: cookies['auth-uid']
};

export const signup = createAsyncThunk(
    'auth/signup',
    async (input, { rejectWithValue }) => {
        try {
            const requestObject = {
                method: 'POST',
                url: 'signup',
                body: input
            };

            const { data, message } = await fetchAPI(requestObject);
            return { user: data.user.id, message };
        } catch (err) {
            console.error(err);
            return rejectWithValue(err);
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const requestObject = {
                method: 'POST',
                url: 'login',
                body: { email, password }
            };

            const { data, message } = await fetchAPI(requestObject);

            return { user: data.user.id, message };
        } catch (err) {
            console.error(err);
            return rejectWithValue(err);
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const requestObject = {
                method: 'GET',
                url: 'logout'
            };

            const { message } = await fetchAPI(requestObject);
            return { message };
        } catch (err) {
            console.error(err);
            return rejectWithValue(err);
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(signup.fulfilled, (state, { payload }) => {
            state.loggedIn = true;
            state.user = payload;
        });
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.loggedIn = true;
            state.user = payload;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.loggedIn = false;
            state.user = null;
        });
        builder.addDefaultCase(state => state);
    }
});

export default authSlice.reducer;