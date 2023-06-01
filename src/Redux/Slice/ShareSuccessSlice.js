import { createSlice } from "@reduxjs/toolkit";

const ShareSuccessSlice =  createSlice({
  name: "shareSuccess",
  initialState: false,
  reducers: {
    shareStatus: (state) => {
      const shareSuccess = !state;
      console.log(shareSuccess,'..................')

      return  !state;
    },
  },
});

export const {shareStatus} = ShareSuccessSlice.actions;
export default ShareSuccessSlice.reducer;
