import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setToken: (state, userToken) => {
      console.log("Auth slice", userToken);
      state.token = userToken.payload;
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
