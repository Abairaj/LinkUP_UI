import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Cookies from "js.cookie";

const API_URL = import.meta.env.VITE_API_URL;

export const UserSuggestionApi = createApi({
  reducerPath: "userSuggestionQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("token");
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
        headers.set("Content-Type", "application/json");
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    UserSuggestions: builder.query({
      query: () => `/users/user_suggestion/`,
    }),
  }),
});

export const {useUserSuggestionsQuery} = UserSuggestionApi;
