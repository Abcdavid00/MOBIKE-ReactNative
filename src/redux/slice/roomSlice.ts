import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Room {
    postId: string;
    users: string[];
    latestMessage: string | null;
    latestTimestamp: Date | null;
    imageId: string | null;
}

export type RoomDictionary = Record<string, Room>;

const initialState: RoomDictionary = {};

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoom: (state, action: PayloadAction<Room>) => {
            const room = action.payload;
            state[room.postId] = room;
        },
    },
});

export const { setRoom } = roomSlice.actions;

export default roomSlice.reducer;
