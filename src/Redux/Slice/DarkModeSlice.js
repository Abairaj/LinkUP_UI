import { createSlice } from "@reduxjs/toolkit";

const DarkModeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: localStorage.getItem("darkMode") === "true", // Initialize darkMode value from local storage
  },
  reducers: {
    toggle: (state) => {
      const darkMode = !state.darkMode;
      localStorage.setItem("darkMode", darkMode); // Update local storage
      return { ...state, darkMode };
    },
    reset: (state) => {
      localStorage.removeItem("darkMode"); // Remove darkMode from local storage
      return { ...state, darkMode: false };
    },
  },
});

export const { toggle, reset } = DarkModeSlice.actions;

export default DarkModeSlice.reducer;
