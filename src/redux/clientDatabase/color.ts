import {createSlice} from '@reduxjs/toolkit';

export type colorType = {
  ID: number;
  Name: string;
  Color_hex: string;
};
const initialState: colorType[] = [];

export const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    setColors: (state, action) => {
      return action.payload;
    },
  },
});

export default colorSlice.reducer;

export const {setColors} = colorSlice.actions;
