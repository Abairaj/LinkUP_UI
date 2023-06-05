import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import darkModeReducer from "./Slice/DarkModeSlice";
import UserProfilereducer from "./Slice/UserProfileSlice";
import ShareSuccessreducer from "./Slice/ShareSuccessSlice";
import { commentApi } from "./Query/CommentQuery";
import { followUnfollowApi } from "./Query/followUnfollowQuery";
import { UserDataApi } from "./Query/userDataQuery";
import { UserSuggestionApi } from "./Query/UserSuggestionsQuery";
import UserProfileSlice from "./Slice/UserProfileSlice";
import { explorePostApi } from "./Query/ExplorePosts";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  [UserDataApi.reducerPath]: UserDataApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [followUnfollowApi.reducerPath]: followUnfollowApi.reducer,
  [UserSuggestionApi.reducerPath]: UserSuggestionApi.reducer,
  [explorePostApi.reducerPath]: explorePostApi.reducer,
  theme: darkModeReducer,
  user: UserProfilereducer,
  shareSuccess: ShareSuccessreducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(UserDataApi.middleware)
      .concat(commentApi.middleware)
      .concat(followUnfollowApi.middleware)
      .concat(UserSuggestionApi.middleware)
      .concat(explorePostApi.middleware)
      .concat(thunk),
});

export default store;
setupListeners(store.dispatch);
export const persistor = persistStore(store);
