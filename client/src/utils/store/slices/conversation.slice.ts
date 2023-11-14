import { createSlice } from "@reduxjs/toolkit";
import { Conversation } from "../../../types/conversation";

export interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    addConversations: (state, action) => {
      state.conversations.unshift(action.payload);
    },
    removeConversations: (state, action) => {
      state.conversations = state.conversations.filter(
        (conversation) => conversation.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

const { 
	addConversations, 
	removeConversations, 
	setLoading 
} = conversationSlice.actions;

export { addConversations, removeConversations, setLoading };
export default conversationSlice.reducer;
