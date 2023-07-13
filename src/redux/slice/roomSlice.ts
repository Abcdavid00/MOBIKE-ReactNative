import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Room {
    id: string;
    postTitle: string;
    users: number[];
    latestMessage: string | null;
    latestTimestamp: Date | null;
    imageId: number | null;
}

export type RoomDictionary = Record<string, Room>;

const initialState: RoomDictionary = {};

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoom: (state, action: PayloadAction<[string,Room]>) => {
            const [roomId, room] = action.payload;
            state[roomId] = room;
        },
    },
});

export const { setRoom } = roomSlice.actions;

export default roomSlice.reducer;
