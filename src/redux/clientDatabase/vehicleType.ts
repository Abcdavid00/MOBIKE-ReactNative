import {createSlice} from '@reduxjs/toolkit';

export type vehicleType = {
  ID: number;
  Type: string;
};

export type vehicleTypeState = Array<vehicleType>;

const initialState: vehicleTypeState = [];

export const vehicleTypeSlice = createSlice({
  name: 'vehiclieTypes',
  initialState,
  reducers: {
    setVehicleTypes: (state, action) => {
      return action.payload;
    },
  },
});

export default vehicleTypeSlice.reducer;

export const {setVehicleTypes} = vehicleTypeSlice.actions;
