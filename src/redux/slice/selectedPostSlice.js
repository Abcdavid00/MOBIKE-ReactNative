import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ID: null,
  // ID_Image: null,
  // Title: null,
  // Pricetag: null,
  // VehicleType: null,
  // VehicleBrand: null,
  isActivePost: null,
  isAdmin: null,
};

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (state, action) => {
      state.ID = action.payload.ID;
      // state.ID_Image = action.payload.ID_Image;
      // state.Title = action.payload.Title;
      // state.Pricetag = action.payload.Pricetag;
      // state.VehicleType = action.payload.VehicleType;
      // state.VehicleBrand = action.payload.VehicleBrand;
      state.isActivePost = action.payload.isActivePost;
      state.isAdmin = action.payload.isAdmin;
    },
  },
});

export const { selectPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
