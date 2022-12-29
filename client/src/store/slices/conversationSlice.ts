import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../../types/ComponentProps/Conversation";

export interface ConversationState {
  conversations: Conversation[];
}

const initialState: ConversationState = {
  conversations: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.push(action.payload);
    },
  },
});


export const { addConversation } = conversationSlice.actions;

export default conversationSlice.reducer;