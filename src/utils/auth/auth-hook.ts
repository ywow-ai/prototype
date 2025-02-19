import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setPermissions, setUser } from "./auth-slice";

type LoginResponseT = ApiResponseT<{ token: string; user: UserT }>;
type TokenResponseT = ApiResponseT<{
  user: UserT;
  role_permissions: PermissionT[];
  user_permissions: PermissionT[];
}>;

export const authApi = createApi({
  reducerPath: "auth-api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    headers: { "Content-Type": "application/json" },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseT, LoginT>({
      query: (attr) => ({
        url: "/auth/login-user",
        method: "POST",
        body: attr,
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          localStorage.setItem("token", response.data.data.token);
        } catch (error) {
          console.error(error);
          // localStorage.removeItem("token");
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({ url: "/logout", method: "DELETE" }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          localStorage.removeItem("token");
        } catch (error) {
          console.error(error);
        }
      },
    }),
    token: builder.mutation<TokenResponseT, void>({
      query: () => ({
        url: "/check-token",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled;
          dispatch(
            setPermissions(
              [
                response.data.data.role_permissions,
                response.data.data.user_permissions,
              ].flat(1)
            )
          );
          dispatch(setUser(response.data.data.user));
        } catch (error) {
          console.error(error);
          dispatch(setPermissions([]));
          dispatch(setUser(null));
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useTokenMutation } =
  authApi;
