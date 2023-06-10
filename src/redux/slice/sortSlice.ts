import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type SortState = number;

const initialState: SortState = 1;

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (state: SortState, action: PayloadAction<SortState>) => {
      state = action.payload;
      return state;
    },
    setInitialSort: () => {
      return initialState;
    },
  },
});

export const {setSort, setInitialSort} = sortSlice.actions;

export default sortSlice.reducer;
