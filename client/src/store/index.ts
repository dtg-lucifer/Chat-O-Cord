import { configureStore } from '@reduxjs/toolkit'
import ConversationReducer from "./slices/conversationSlice"

export const store = configureStore({
  reducer: {
    conversation: ConversationReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    })
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch