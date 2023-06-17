import {createSlice} from '@reduxjs/toolkit';

export type vehicleBrandsItemType = {
  ID: number;
  ID_Image: number;
  Name: string;
};
export type vehicleBrandsType = Array<vehicleBrandsItemType>;

export type vehicleLineUpsItemType = {
  ID: number;
  ID_VehicleBrand: number;
  Lineup: string;
};
export type vehicleLineUpsType = Array<vehicleLineUpsItemType>;

const initialState: {
  VehicleBrands: vehicleBrandsType;
  VehicleLineUps: vehicleLineUpsType;
} = {
  VehicleBrands: [],
  VehicleLineUps: [],
};

export const vehicleModelSlice = createSlice({
  name: 'vehicleModels',
  initialState,
  reducers: {
    setVehicleBrands: (state, action) => {
      state.VehicleBrands = action.payload;
    },

    setVehicleLineUps: (state, action) => {
      state.VehicleLineUps = action.payload;
    },
  },
});

export default vehicleModelSlice.reducer;

export const {setVehicleBrands, setVehicleLineUps} = vehicleModelSlice.actions;
