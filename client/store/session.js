import { createSlice } from '@reduxjs/toolkit';
import { url } from '../util/url';

const sessionSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoggedIn: false,
    },
    reducers: {
        loadUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        }
    }
});

export const { loadUser, removeUser } = sessionSlice.actions;
export default sessionSlice.reducer;
