import { configureStore } from "@reduxjs/toolkit";

import conversationReducer from "./slices/conversation.slice";
import messageReducer from "./slices/messages.slice";

export const store = configureStore({
	reducer: {
		conversation: conversationReducer,
		messages: messageReducer
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
		});
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch