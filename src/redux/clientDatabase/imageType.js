import {createSlice} from '@reduxjs/toolkit';

const initialState = []

export const imageTypeSlice = createSlice({
    name: 'imageTypes',
    initialState,
    reducers: {
        addImageType: (state, action) => {
            state.push(action.payload);
        },
        setImageTypes: (state, action) => {
            return action.payload;
        }
    }

});

export default imageTypeSlice.reducer;

export const {addImageType, setImageTypes} = imageTypeSlice.actions;