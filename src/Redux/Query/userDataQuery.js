import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Cookies from "js.cookie";

const API_URL = import.meta.env.VITE_API_URL;

export const UserDataApi = createApi({
  reducerPath: "userDataQuery",
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
    userData: builder.query({
      query: (user_id) => `users/user_profile/${user_id}`,
    }),
    updateUser: builder.mutation({
      query: (user_id, userData) => ({
        url: `/user_profile/${user_id}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const { useUserDataQuery, useUpdateUserMutation } = UserDataApi;
