import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState: boolean = true;

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state: boolean, action: PayloadAction<boolean>) => {
      state = action.payload;
      return state;
    },
  },
});

export const {setLoading} = loadingSlice.actions;
export default loadingSlice.reducer;
