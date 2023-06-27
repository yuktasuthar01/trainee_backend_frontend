import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: '',
    sort: ''
};

const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        filterBy(state, { payload }) {
            state.search = payload;
        },
        sortBy(state, { payload }) {
            state.sort = payload;
        },
        clearSearch(state) {
            state.search = '';
        },
        clearSort(state) {
            state.sort = '';
        }
    }
});

export const { filterBy, sortBy, clearSearch, clearSort } = querySlice.actions;

export default querySlice.reducer;