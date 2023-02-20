import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isInitializing: null,
  },
  reducers: {
    setToken: (state, userToken) => {
      console.log("set user token called");
      console.log("Auth slice", userToken);
      state.token = userToken.payload;
    },
    setUser: (state, userObject) => {
      console.log("Auth slice: setting user: ", userObject.payload);
      state.user = userObject.payload;
    },
    setInititalizing: (state, payload) => {
      state.isInitializing = payload.payload;
    },
  },
});

export const { setToken, setInititalizing } = authSlice.actions;
export function setAdminToken(token) {
  console.log("Set Admin Token called: ", token);
  return (dispatch) => {
    dispatch(authSlice.actions.setToken(token));
  };
}
export function setAdmin(user) {
  console.log("Authslice: setAdmin as ", user);
  return (dispatch) => {
    dispatch(authSlice.actions.setUser(user));
  };
}
export default authSlice.reducer;
