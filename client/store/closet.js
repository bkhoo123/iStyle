import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { url } from "../util/url";

// export const addCloset = createAsyncThunk(`closet/addCloset`, async({ userId, newCloset }) => {
//     const response = await fetchCreateCloset(userId, newCloset);
//     return response;
// })

export const addCloset = createAsyncThunk(`closet/addCloset`, async (newCloset, { getState }) => {
	const userId = getState().session.user.user.id;
	console.log("addCloset", newCloset);
	console.log("userId:", userId);
	console.log("adding new closet");
	const response = await fetchCreateCloset(userId, newCloset);
	console.log("new closet ==>", response);
	return response;
});

const closetSlice = createSlice({
	name: "closet",
	initialState: {
		closets: [],
		selectedClosetId: null,
	},
	reducers: {
		addCloset: (state, action) => {
			state.closets.push(action.payload);
		},
		editCloset: (state, action) => {
			const { closetId, closetInfo } = action.payload;
			const closetToEdit = state.closets.find((closet) => closet.id == closetId);
			// if (closetToEdit) {
			//     closet
			// }
			return closetToEdit;
		},
		// deleteCloset: (state, action)
	},
});

export default closetSlice.reducer;

export const fetchCreateCloset = async (userId, newCloset) => {
	try {
		console.log("newCloset=>", newCloset);
		const response = await fetch(`${url}/closet/${userId}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newCloset),
		});

		console.log("fetchCreateCloset");

		return response.json();
	} catch {
		console.error("Error creating closet:", error);
	}
};
