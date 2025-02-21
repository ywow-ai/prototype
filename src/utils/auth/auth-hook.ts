import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { resetPermissions, setUser } from "./auth-slice";
import { setIsLoading } from "../app/app-slice";

type _PermissionT = Omit<PermissionT, "module">;
type LoginResponseT = ApiResponseT<{ token: string; user: UserT }>;
type TokenResponseT = ApiResponseT<{
  user: UserT;
  role_permissions: PermissionT[];
  user_permissions: PermissionT[];
}>;

const initPermissions: _PermissionT = {
  can_create: false,
  can_delete: false,
  can_edit: false,
  can_view: false,
};

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
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setIsLoading(true));
          const response = await queryFulfilled;
          localStorage.setItem("token", response.data.data.token);
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(setIsLoading(false));
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
          dispatch(setIsLoading(true));
          const response = await queryFulfilled;
          dispatch(setUser(response.data.data.user));

          const _permission = [
            response.data.data.role_permissions,
            response.data.data.user_permissions,
          ]
            .flat(1)
            .reduce<Record<ModuleT, _PermissionT>>(
              (acc, { module, can_view, can_create, can_edit, can_delete }) => {
                return {
                  ...acc,
                  ...(module
                    ? {
                        [module]: {
                          ...initPermissions,
                          can_view: acc[module]?.can_view || can_view || false,
                          can_create:
                            acc[module]?.can_create || can_create || false,
                          can_edit: acc[module]?.can_edit || can_edit || false,
                          can_delete:
                            acc[module]?.can_delete || can_delete || false,
                        },
                      }
                    : {}),
                };
              },
              {} as Record<ModuleT, _PermissionT>
            );

          console.log(_permission);

          // const module = routes.find(({ path }) => path === pathname)?.module;

          // if (module === undefined) {
          //   setPermission({
          //     can_create: true,
          //     can_delete: true,
          //     can_edit: true,
          //     can_view: true,
          //   });
          // }

          // if (module) {
          //   setPermission(_permission[module]);
          // }
        } catch (error) {
          console.error(error);
          dispatch(resetPermissions());
          dispatch(setUser(null));
        } finally {
          dispatch(setIsLoading(false));
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useTokenMutation } =
  authApi;
