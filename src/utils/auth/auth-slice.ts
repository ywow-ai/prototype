import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth-slice",
  initialState: {
    user: null as UserT | null,
    permissions: [] as PermissionT[],
  },
  reducers: {
    setUser: (state, actions: PayloadAction<UserT | null>) => {
      state.user = actions.payload;
    },
    setPermissions: (state, actions: PayloadAction<PermissionT[]>) => {
      state.permissions = actions.payload;
    },
  },
});

export const { setPermissions, setUser } = authSlice.actions;
