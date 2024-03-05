import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../util/url";

// async action creator
export const loginUser = createAsyncThunk(`user/loginUser`, async ({ email, password }) => {
	const response = await fetchLogin(email, password);
	return response;
});

export const restoreUser = createAsyncThunk(`user/restoreUser`, async () => {
	const response = await fetchRestoreUser();
	const data = await response.json();
	return data;
});

export const signUpUser = createAsyncThunk(`user/signUpUser`, async (user) => {
	console.log("SIGN UPPPPPP");
	const response = await fetchSignUp(user);
	const data = await response.json();
	console.log("data ===>", data);
	return data;
});

export const logoutUser = createAsyncThunk(`user/logoutUser`, async () => {
	const response = await fetchLogout();
	return response;
});

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
				console.log("user==>", action.payload);
				state.user = action.payload;
				state.isLoggedIn = true;
			})
			.addCase(loginUser.rejected, (state) => {
				state.user = null;
				state.isLoggedIn = false;
			})
			.addCase(restoreUser.fulfilled, (state, action) => {
				state.user = action.payload;
				if (state.user) {
					state.isLoggedIn = true;
				} else {
					state.isLoggedIn = false;
				}
			})
			.addCase(restoreUser.rejected, (state) => {
				state.user = null;
				state.isLoggedIn = false;
			})
			.addCase(signUpUser.fulfilled, (state, action) => {
				console.log("user==>", action.payload);
				state.user = action.payload;
				state.isLoggedIn = true;
			})
			.addCase(signUpUser.rejected, (state) => {
				state.user = null;
				state.isLoggedIn = false;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.isLoggedIn = false;
			});
	},
});

export const { removeUser } = sessionSlice.actions;
export default sessionSlice.reducer;

// user login
export const fetchLogin = async (email, password) => {
	try {
		// to-do: update backend route
		const response = await fetch(`${url}/user/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email,
				password,
			}),
		});

		// if (response.ok) {
		return response.json();
		// }
	} catch (error) {
		console.error("Error logging in:", error);
	}
};

// signup user
export const fetchSignUp = async (user) => {
	try {
		console.log("user ===> signup", user);
		const response = await fetch(`${url}/user/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				user,
			}),
		});

		console.log("response==>", response.json());

		return response;
	} catch (error) {
		console.error("Error signing up:", error);
	}
};

// restore user
export const fetchRestoreUser = async () => {
	try {
		const response = await fetch(`${url}/user/`);

		return response;
	} catch (error) {
		console.error("Error restoring user data:", error);
	}
};

// logout user
export const fetchLogout = async () => {
	try {
		const response = await fetch(`${url}/user/logout`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email,
			}),
		});

		return response;
	} catch (error) {
		console.error("Error logging out:", error);
	}
};
