import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './reducers/registerSlice';
import resendOtpSlice from './reducers/resendOtpSlice';
import loginSlice from './reducers/loginSlice';

export const store = configureStore({
  reducer: {
    registerData: registerSlice,
    resendOtpData: resendOtpSlice,
    loginData: loginSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch