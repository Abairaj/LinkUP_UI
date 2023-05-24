import { configureStore } from '@reduxjs/toolkit';
import darkModeReducer from './Slice/DarkModeSlice'

const store = configureStore({
  reducer: {
    theme: darkModeReducer
  }
});

export default store;
