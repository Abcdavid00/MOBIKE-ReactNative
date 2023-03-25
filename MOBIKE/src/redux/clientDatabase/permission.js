import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const permissionSlice = createSlice({
    name: "permissions",
    initialState,
    reducers: {
        addPermission: (state, action) => {
            state.push(action.payload);
        },

        setPermissions: (state, action) => {
            return action.payload;
        }
    }
})

export default permissionSlice.reducer;

export const {addPermission, setPermissions} = permissionSlice.actions;