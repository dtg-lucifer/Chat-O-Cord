import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Message } from "../../types/ComponentProps/Conversation";
import { getConversationMessages } from "../../utils/api";

export interface MessageState {
  messages: Array<{ id: number; messages: Message[] }>;
  loading: boolean;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
};

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  async (id: number) => {
    return getConversationMessages(id);
  }
);

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ id: number; message: Message }>
    ) => {
      const conversationMessage = state.messages.find(
        (cm) => cm.id === action.payload.id
      );
      conversationMessage &&
        conversationMessage.messages.unshift(action.payload.message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessagesThunk.fulfilled, (state, action) => {
      const { id } = action.payload.data;
      const isExists = state.messages.find((m) => m.id === id);
      const i = state.messages.findIndex((m) => m.id === id);
      if (isExists) {
        state.messages[i] = action.payload.data;
      } else {
        state.messages.push(action.payload.data);
      }
    });
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
