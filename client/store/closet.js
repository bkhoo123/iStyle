import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { url } from '../util/url';

export const addCloset = createAsyncThunk(`closet/addCloset`, async({ userId, newCloset }) => {
    // const response = await;
})

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
            const closetToEdit = state.closets.find(closet => closet.id == closetId);
            if (closetToEdit) {
                closet
            }
        },
        deleteCloset: (state, action)
    }
})


export const fetchCreateCloset = async (userId, newCloset) => {
    try {
        const response = await fetch(`${url}/closet/`)
    } catch {
        // 
    }
}
