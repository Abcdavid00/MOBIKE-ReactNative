import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export type ThemeState = 'light' | 'dark';

const initialState: ThemeState = 'dark';

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state: ThemeState, action: PayloadAction<ThemeState>) => {
      state = action.payload;
    },
  },
});

export const {setTheme} = themeSlice.actions;

export default themeSlice.reducer;
