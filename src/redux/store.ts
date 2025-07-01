import { configureStore } from "@reduxjs/toolkit";
import { reducer, middleware } from "./root-reducer";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: reducer,
  middleware,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
