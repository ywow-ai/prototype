import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app-slice",
  initialState: {
    isLoading: true as boolean,
  },
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = appSlice.actions;
