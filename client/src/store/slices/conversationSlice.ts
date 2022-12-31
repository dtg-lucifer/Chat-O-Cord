import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../../types/ComponentProps/Conversation";
import { getConversations } from "../../utils/api";

export interface ConversationState {
  conversations: Map<number, Conversation>
}

const initialState: ConversationState = {
  conversations: new Map(),
};

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  async () => {
    return await getConversations()
  }
);

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      // state.conversations.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversationsThunk.fulfilled, (state, action) => {
      action.payload.data.forEach(conversation => {
        state.conversations.set(conversation.id, conversation)
      })
      console.log(state.conversations)
    })
  }
});

export const { addConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
