import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "./auth-slice";

export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    headers: { "Content-Type": "application/json" },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      ApiResponseT<{ token: string; user: UserT }>,
      LoginT
    >({
      query: (attr) => ({
        url: "/auth/login-user",
        method: "POST",
        body: attr,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          dispatch(setToken(response.data.data.token));
        } catch (error) {
          console.error(error);
          dispatch(setToken(null));
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({ url: "/logout", method: "DELETE" }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error(error);
        }
      },
    }),
    token: builder.mutation<ApiResponseT<unknown>, string>({
      query: (attr) => ({
        url: "/check-token",
        headers: { Authorization: `Bearer ${attr}` },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useTokenMutation } =
  authApi;
