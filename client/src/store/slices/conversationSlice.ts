import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation, Message } from "../../types/ComponentProps/Conversation";
import { getConversationMessages, getConversations } from "../../utils/api";

export interface ConversationState {
  conversations: Conversation[];
  messages: Array<{ id: number; messages: Message[] }>;
  loading: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  messages: [],
  loading: false,
};

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  async () => {
    return getConversations();
  }
);

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  async (id: number) => {
    return getConversationMessages(id);
  }
);

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.push(action.payload);
    },
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
    builder
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        const isExists = state.messages.find((m) => m.id === id);
        const i = state.messages.findIndex((m) => m.id === id);
        if (isExists) {
          state.messages[i] = action.payload.data;
        } else {
          state.messages.push(action.payload.data)
        }
      })
      .addCase(fetchMessagesThunk.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { addConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
