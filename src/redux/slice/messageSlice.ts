import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Message {
    id: string;
    roomId: string;
    senderId: number[];
    content: string | null;
    timestamp: Date | null;
}

export type MessageInRoom = Record<string, Message[]>;

const initialState: MessageInRoom = {};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessages: (state, action: PayloadAction<[string, Message[]]>) => {
            const [roomId, messages] = action.payload;
            if (!state[roomId]) {
                state[roomId] = [];
            }
            state[roomId].push(...messages);
            // Sort messages by timestamp
            state[roomId].sort((a, b) => {
                if (a.timestamp && b.timestamp) {
                    return a.timestamp.getTime() - b.timestamp.getTime();
                }
                return 0;
            })
        },
        setMessage: (state, action: PayloadAction<Message>) => {
            const message = action.payload;
            if (!state[message.roomId]) {
                state[message.roomId] = [];
            }
            // Remove old message
            state[message.roomId] = state[message.roomId].filter((m) => m.id !== message.id);
            // Add new message
            state[message.roomId].push(message);
            // Sort messages by timestamp
            state[message.roomId].sort((a, b) => {
                if (a.timestamp && b.timestamp) {
                    return a.timestamp.getTime() - b.timestamp.getTime();
                }
                return 0;
            })
        },
    },
});

export const { setMessage, addMessages } = messageSlice.actions;

export default messageSlice.reducer;
