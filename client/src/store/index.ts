import { configureStore } from "@reduxjs/toolkit";
import ConversationReducer from "./slices/conversationSlice";
import MessageReducer from "./slices/messageSlice"

export const store = configureStore({
  reducer: {
    conversation: ConversationReducer,
    messages: MessageReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
