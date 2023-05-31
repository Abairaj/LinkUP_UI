import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import darkModeReducer from "./Slice/DarkModeSlice";
import UserProfilereducer from "./Slice/UserProfileSlice";
import ShareSuccessreducer from "./Slice/ShareSuccessSlice";
import { commentApi } from "./Query/CommentQuery";
import { followUnfollowApi } from "./Query/followUnfollowQuery";
import { UserDataApi } from "./Query/userDataQuery";
import { UserSuggestionApi } from "./Query/UserSuggestionsQuery";

const store = configureStore({
  reducer: {
    [UserDataApi.reducerPath]: UserDataApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [followUnfollowApi.reducerPath]: followUnfollowApi.reducer,
    [UserSuggestionApi.reducerPath]:UserSuggestionApi.reducer,
    theme: darkModeReducer,
    user: UserProfilereducer,
    shareSuccess: ShareSuccessreducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(UserDataApi.middleware)
      .concat(commentApi.middleware)
      .concat(followUnfollowApi.middleware)
      .concat(UserSuggestionApi.middleware),
});

export default store;
setupListeners(store.dispatch);
