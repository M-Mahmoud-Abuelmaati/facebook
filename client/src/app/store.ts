import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import postReducer from "../features/postSlice"
import commentReducer from "../features/commentSlice"
import replyReducer from "../features/replySlice"

export const store = configureStore({
  reducer: {
    posts: postReducer,
    comments: commentReducer,
    replys: replyReducer,
    users: userReducer,
  },
  //This one disables an error from serializableCheck
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
