import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Conversation } from "../../../types/conversation";
import { getConversations } from "../../../lib/api";

export interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
};

export const getConversationsAsync = createAsyncThunk(
  "conversation/fetch",
  async (mode: string) => {
    return await getConversations(mode);
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addConversations: (state, action) => {
      state.conversations.unshift(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateLastMessage: (state, action) => {
      const conversation = state.conversations.find(
        (c) => c.id === action.payload.id
      );
      if (conversation) {
        conversation.lastMessageContent = action.payload.lastMessageContent;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getConversationsAsync.fulfilled, (state, action) => {
      state.conversations = action.payload.data;
      state.loading = false;
    });
  },
});

export const { addConversations, setLoading, updateLastMessage } =
  conversationSlice.actions;
export default conversationSlice.reducer;
