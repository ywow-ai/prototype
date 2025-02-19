import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth-slice";
import { authApi } from "./auth/auth-hook";
import { appSlice } from "./app/app-slice";

export const store = configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer,
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type StoreT = ReturnType<typeof store.getState>;
