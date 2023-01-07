import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation, CreateMessagePayload } from "../../types/ComponentProps/Conversation";
import { getConversations } from "../../utils/api";

export interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
};

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  async () => {
    return getConversations();
  }
);

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.push(action.payload);
    },
    updateLastMessage: (state, action: PayloadAction<CreateMessagePayload>) => {
      console.log(action.payload)
      const { conversation, ...message } = action.payload
      const index = state.conversations.findIndex(c => c.id === conversation.id)
      state.conversations[index].lastMessageSent = message
      const c = state.conversations.splice(index, 1)
      state.conversations.unshift(c[0])
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchConversationsThunk.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { addConversation, updateLastMessage } = conversationSlice.actions;

export default conversationSlice.reducer;
