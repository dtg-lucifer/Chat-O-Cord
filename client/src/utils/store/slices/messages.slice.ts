import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Message } from "../../../types/conversation";
import { GetMessagesData } from "../../../types/authentication";
import { getMessages } from "../../../lib/api";

export interface MessagesState {
  messages: Array<{ convId: string; messages: Message[] }>;
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
};

export const getMessagesAsync = createAsyncThunk(
  "messages/fetch",
  async (data: GetMessagesData) => {
    return (await getMessages({ ...data }));
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessages: (state, action) => {
      state.messages.push({
        convId: action.payload.convId,
        messages: action.payload.messages,
      });
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessagesAsync.fulfilled, (state, action) => {
      const { id, messages } = action.payload.data;
      const isExists = state.messages.find((m) => m.convId === id);
      const i = state.messages.findIndex((m) => m.convId === id);
      if (isExists) state.messages[i] = { convId: id, messages };
      else state.messages.push({ convId: id, messages });
    });
  },
});
