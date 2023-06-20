import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type ThemeState = 'light' | 'dark';

const initialState: ThemeState = 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState>) => {
      return action.payload;
    },
  },
});

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;
