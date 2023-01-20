import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Conversation, CreateMessagePayload } from "../../types/ComponentProps/Conversation";
import { createConversation, getConversations } from "../../utils/api";

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

export const createConversationThunk = createAsyncThunk(
  "conversations/create",
  async (payload: {email: string, message: string}) => {
    return createConversation(payload)
  }
);

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      state.conversations.unshift(action.payload);
    },
    updateConversation: (state, action: PayloadAction<CreateMessagePayload>) => {
      const { conversation, ...message } = action.payload
      const index = state.conversations.findIndex(c => c.id === conversation.id)
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
      })
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        state.conversations.unshift(action.payload.data);
        state.loading = false;
      })
      .addCase(createConversationThunk.pending, (state) => {
        state.loading = true;
      })
  },
});

export const { addConversation, updateConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
