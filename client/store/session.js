import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { url } from '../util/url';

// async action creator
export const loginUser = createAsyncThunk(`user/loginUser`, async ({ email, password }) => {
    const response = await fetchLogin(email, password);
    const data = await response.json();
    return data;
})

export const restoreUser = createAsyncThunk(`user/restoreUser`, async () => {
    const response = await fetchRestoreUser();
    const data = await response.json();
    return data;

})

export const signUpUser = createAsyncThunk(`user/signUpUser`, async (user) => {
    console.log("USER", user)
    const response = await fetchSignUp(user);
    const data = await response.json();
    console.log("data__", data);
    return data;
})

const sessionSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoggedIn: false,
    },
    reducers: {
        removeUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(restoreUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(restoreUser.rejected, (state) => {
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(signUpUser.rejected, (state) => {
                state.user = null;
                state.isLoggedIn = false;
            })
    }
});

export const { removeUser } = sessionSlice.actions;
export default sessionSlice.reducer;


// user login
export const fetchLogin = async (email, password) => {
    try {
        // to-do: update backend route
        const response = await fetch(`${url}/user/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password
            })
        })

        if (response.ok) {
            return response;
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }
}

// restore user
export const fetchRestoreUser = async () => {
    try {
        const response = await fetch(`${url}/user/`);

        return response;
    } catch(error) {
        console.error('Error restoring user data:', error);
    }
}

/***
// restore user
export const fetchRestoreUser = async () => {
    try {
        const response = await fetch(`${url}/user/`);

        return response;
    } catch(error) {
        console.error('Error restoring user data:', error);
    }
}

// sign up user
export const fetchSignUp = async (user) => {
    try {
        console.log("USER:::", user)
        const response = await fetch(`${url}/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        return response;
    } catch (error) {
        console.error('Error signing up:', error);
    }
}

/***

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
***/
