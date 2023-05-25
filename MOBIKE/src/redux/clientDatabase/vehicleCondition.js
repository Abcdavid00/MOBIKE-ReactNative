import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const vehicleConditionSlice = createSlice({
    name: "vehiclieConditions",
    initialState,
    reducers: {
        setVehicleConditions: (state, action) => {
            return action.payload;
        }
    }
})

export default vehicleConditionSlice.reducer;

export const { setVehicleConditions } = vehicleConditionSlice.actions;