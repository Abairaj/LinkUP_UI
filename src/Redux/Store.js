import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import darkModeReducer from './Slice/DarkModeSlice'
import UserProfilereducer from './Slice/UserProfileSlice';
import ShareSuccessreducer from './Slice/ShareSuccessSlice';
import { commentApi } from './Query/CommentQuery';


const store = configureStore({
  reducer: {
    [commentApi.reducerPath]: commentApi.reducer,
    theme: darkModeReducer,
    user:UserProfilereducer,
    shareSuccess:ShareSuccessreducer,

  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(commentApi.middleware),
});


export default store;
setupListeners(store.dispatch)

