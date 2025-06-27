import {createSlice} from '@reduxjs/toolkit';

// createSlice documentation: https://redux-toolkit.js.org/api/createSlice
const slice = createSlice({
    name: 'welcome',
    initialState: {
        count: 1,
    },
    reducers: {
        incrementCount: (state, action) => {
            // Note that this mutation is using Immer under the hood to actually produce
            // a new immutable state.
            // Refer: https://redux-toolkit.js.org/api/createReducer#direct-state-mutation
            state.count += action.payload || 1;
        },
    },
});
export const {incrementCount} = slice.actions;
export default slice.reducer;
