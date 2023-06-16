import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    notification: (state, action) => {
      const user = action.payload;

      return action.payload;
    },
  },
});

export const { notification } = NotificationSlice.actions;
export default NotificationSlice.reducer;
