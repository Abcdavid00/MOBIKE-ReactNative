import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    LikedPosts: [],
}

const LikeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        setLikedPosts: (state, action) => {
            state.LikedPosts = action.payload;
        }
    }
});

export const { setLikedPosts } = LikeSlice.actions

export default LikeSlice.reducer