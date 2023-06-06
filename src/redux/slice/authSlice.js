import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ID: null,
  token: null,
  permission: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.ID = action.payload.ID;
      state.token = action.payload.token;
      state.permission = action.payload.permission;
      // state.isLoggedIn = state.ID != null && state.token != null
      state.isLoggedIn = state.token != null;
      return state;
    },
    logout: (state) => {
      state.ID = null;
      state.token = null;
      state.permission = null;
      state.isLoggedIn = false;
      return state;
    }
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
