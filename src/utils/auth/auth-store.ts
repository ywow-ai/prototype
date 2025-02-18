import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth-hook";
import { authSlice } from "./auth-slice";

export const authStore = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type AuthT = ReturnType<typeof authStore.getState>;
