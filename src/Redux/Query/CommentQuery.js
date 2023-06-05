import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js.cookie";
const API_URL = import.meta.env.VITE_API_URL;

// Define a service using a base URL and expected endpoints
export const commentApi = createApi({
  reducerPath: "commentApi",
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
    fetchComment: builder.query({
      query: (post_id) => `/post/get_comment/${post_id}`,
    }),
    createComment: builder.mutation({
      query: (commentData) => ({
        url: "/post/add_comment/",
        method: "POST",
        body: commentData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useFetchCommentQuery, useCreateCommentMutation } = commentApi;
