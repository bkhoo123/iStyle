import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from './session';

export const store = configureStore({
    reducer: {
        session: sessionSlice,
    }
})

