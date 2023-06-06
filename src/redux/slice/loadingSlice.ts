import {PayloadAction, createSlice} from '@reduxjs/toolkit';

const initialState: Boolean = true;

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state: Boolean, action: PayloadAction<Boolean>) => {
      state = action.payload;
      return state;
    },
  },
});

export const {setLoading} = loadingSlice.actions;
export default loadingSlice.reducer;
