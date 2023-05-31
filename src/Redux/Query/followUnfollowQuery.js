import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js.cookie'
const API_URL = import.meta.env.VITE_API_URL;

export const followUnfollowApi = createApi({
  reducerPath: "followUnfollowApi",
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
    followUnfollowUser: builder.mutation({
      query: ({ user_id, formData }) => ({
        url: `users/follow/${user_id}`,
        method: "POST",
        body: formData,
      }),
      providesTags: ["Follow"],
    }),
  }),
});

export const { useFollowUnfollowUserMutation } = followUnfollowApi;
