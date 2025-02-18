import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth-slice",
  initialState: {
    token: localStorage.getItem("token") as string | null,
    user: null as UserT | null,
  },
  reducers: {
    setToken: (state, actions: PayloadAction<string | null>) => {
      if (actions.payload) {
        localStorage.setItem("token", actions.payload);
      } else {
        localStorage.removeItem("token");
      }
      state.token = actions.payload;
    },
    setUser: (state, actions: PayloadAction<UserT | null>) => {
      state.user = actions.payload;
    },
  },
});

export const { setToken, setUser } = authSlice.actions;
