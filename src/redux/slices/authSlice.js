import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setToken: (state, userToken) => {
      state.token = userToken;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
