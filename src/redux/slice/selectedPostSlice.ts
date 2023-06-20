import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ID: null,
  isActivePost: null,
  isAdmin: null,
};

export type selectedPostState = {
  ID: number | null,
  isActivePost: boolean | null,
  isAdmin: boolean | null,
}

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    selectPost: (state, action) => {
      state.ID = action.payload.ID;
      state.isActivePost = action.payload.isActivePost;
      state.isAdmin = action.payload.isAdmin;
      // console.log('Selected Post: '+ JSON.stringify(state))
      return state;
    },
  },
});

export const { selectPost } = selectedPostSlice.actions;

export default selectedPostSlice.reducer;
