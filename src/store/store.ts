import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './reducers/registerSlice';
import resendOtpSlice from './reducers/resendOtpSlice';
import loginSlice from './reducers/loginSlice';
import categorySlice from './reducers/categorySlice';
import editSlice from './reducers/editSlice';

export const store = configureStore({
  reducer: {
    registerData: registerSlice,
    resendOtpData: resendOtpSlice,
    loginData: loginSlice,
    categoryData: categorySlice,
    editData: editSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch