import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Message {
    roomId: string;
    senderId: string[];
    content: string | null;
    timestamp: Date | null;
}

export type MessageDictionary = Record<string, Message>;

const initialState: MessageDictionary = {};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<Message>) => {
            const message = action.payload;
            state[message.roomId] = message;
        },
    },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;
