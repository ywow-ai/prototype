import { configureStore, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("item") as string | null,
    user: null as UserT | null,
  },
  reducers: {
    setAuth: () => {},
  },
});

export const store = configureStore({ reducer: slice.reducer });
export const { setAuth } = slice.actions;
export type AuthT = ReturnType<typeof store.getState>;
