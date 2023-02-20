import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { useNavigate } from "react-router";
import axios from "axios";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().authSlice.token;
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "users",
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["Users"],
      transformResponse: (response, meta, arg) => response,
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: "users",
        method: "DELETE",
        body: { id: id },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useAddUserMutation,
} = userApi;

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      name: "Baraka",
      age: 0,
      email: "",
      api_id: "API3462965997",
      api_password: "Licks@2021!",
      token: "7|iGA0wE5O1J8wClcSAC5ZEFAr9hQeZl92qUvgmMxt",
    },
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = {};
    },
  },
});

export function logUserOut() {
  return async (dispatch) => {
    dispatch(userSlice.actions.logout());
  };
}

export function logUserIn(email, password) {
  return async (dispatch) => {
    const response = await axios.get(
      "https://localhost/semaapi/public/api/loginuser",
      {
        params: { email: email, password: password },
      }
    );
    // console.log(response);
    dispatch(userSlice.actions.login(response.data));
  };
}

export default userSlice.reducer;
