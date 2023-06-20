import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Message {
    roomId: string;
    senderId: number[];
    content: string | null;
    timestamp: Date | null;
}

export type MessageDictionary = Record<string, Message>;

export type MessageInRoom = Record<string, MessageDictionary>;

const initialState: MessageInRoom = {};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<[string, Message]>) => {
            const [messageId, message] = action.payload;
            state[message.roomId][messageId] = message;
        },
    },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;
