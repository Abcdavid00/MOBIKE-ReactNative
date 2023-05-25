import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const colorSlice = createSlice({
    name: "colors",
    initialState,
    reducers: {
        setColors: (state, action) => {
            return action.payload;
        }
    }
})

export default colorSlice.reducer;

export const { setColors } = colorSlice.actions;