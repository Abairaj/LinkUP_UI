import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js.cookie";

const API_URL = import.meta.env.VITE_API_URL;

export const explorePostApi = createApi({
  reducerPath: "exploreApi",
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
    explorePosts: builder.query({
      query: (page) => `post/all_posts?page=${page}`,
    }),
  }),
});

export const { useExplorePostsQuery } = explorePostApi;
