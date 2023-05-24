import { createSlice } from "@reduxjs/toolkit";

const UserProfileSlice = createSlice({
  name: "userData",
  initialState: [],
  reducers: {
    userData: (state, action) => {
      const user = action.payload;

      return action.payload;
    },
  },
});

export const { userData } = UserProfileSlice.actions;
export default UserProfileSlice.reducer;
