import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const vehicleTypeSlice = createSlice({
    name: "vehiclieTypes",
    initialState,
    reducers: {
        setVehicleTypes: (state, action) => {
            return action.payload;
        }
    }
})

export default vehicleTypeSlice.reducer;

export const { setVehicleTypes } = vehicleTypeSlice.actions;