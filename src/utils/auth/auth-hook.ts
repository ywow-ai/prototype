import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/auth" }),
  endpoints: (builder) => ({
    login: builder.mutation<
      ApiResponseT<{ token: string; user: UserT }>,
      LoginT
    >({
      query: (attr) => ({
        url: "/login",
        method: "POST",
        body: attr,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
        } catch (error) {
          console.error(error);
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
    token: builder.mutation({
      query: () => ({ url: "/check-token" }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export { api as authApi };
export const { useLoginMutation, useLogoutMutation, useTokenMutation } = api;
