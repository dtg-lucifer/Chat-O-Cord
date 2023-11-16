import { configureStore } from "@reduxjs/toolkit";

import conversationReducer from "./slices/conversation.slice";

export const store = configureStore({
	reducer: {
		conversation: conversationReducer,
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