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
            const loadUserState = { ...state };
            loadUserState.user = action.user;
        },
        removeUser: (state, action) => {
            const removeUserState = { ...state };
            removeUserState.user = null;
        }
    }
});

export const { loadUser, removeUser } = sessionSlice.actions;
export default sessionSlice.reducer;

// user login
export const loginUser = (user) => async (dispatch) => {
    try {
        const { credential, password } = user;

        // to-do: update backend route
        const response = await fetch(`${url}/user/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                credential,
                password
            })
        })

        const data = await response.json();
        dispatch(loadUser(data.user));
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

// restore user
export const restoreUser = () => async (dispatch) => {
    try {
        // to-do: update backend route
        const response = await fetch(`${url}/user/login`);
        const data = await response.json();

        dispatch(loadUser(data.user));
    } catch(error) {
        console.error('Error restoring user data:', error);
    }
}

// sign up user
export const signup = (user) => async (dispatch) => {
    try {
        // to-do: update signup backend route
        const response = await fetch(`${url}/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        const data = await response.json();
        dispatch(loadUser(data));
    } catch (error) {
        console.log('Error signing up:', error)
    }

}
