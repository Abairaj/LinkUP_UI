import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './Slice/DarkModeSlice'
import UserProfilereducer from './Slice/UserProfileSlice';

const store = configureStore({
  reducer: {
    theme: darkModeReducer,
    user:UserProfilereducer,

  }
});


export default store;
