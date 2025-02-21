import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initPermissions: PermissionT = {
  module: null,
  can_view: false,
  can_create: false,
  can_delete: false,
  can_edit: false,
};

export const authSlice = createSlice({
  name: "auth-slice",
  initialState: {
    user: null as UserT | null,
    permissions: initPermissions,
  },
  reducers: {
    setUser: (state, actions: PayloadAction<UserT | null>) => {
      state.user = actions.payload;
    },
    setPermissions: (state, actions: PayloadAction<PermissionT>) => {
      state.permissions = actions.payload;
    },
    resetPermissions: (state) => {
      state.permissions = initPermissions;
    },
  },
});

export const { setPermissions, resetPermissions, setUser } = authSlice.actions;
