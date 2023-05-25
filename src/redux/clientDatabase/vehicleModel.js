import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    VehicleBrands: [],
    VehicleLineUps: []
}

export const vehicleModelSlice = createSlice({
    name: "vehicleModels",
    initialState,
    reducers: {
        setVehicleBrands: (state, action) => {
            state.VehicleBrands = action.payload;
        },

        setVehicleLineUps: (state, action) => {
            state.VehicleLineUps = action.payload;
        }
    }
})

export default vehicleModelSlice.reducer;

export const {setVehicleBrands, setVehicleLineUps} = vehicleModelSlice.actions;