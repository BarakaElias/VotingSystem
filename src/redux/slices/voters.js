import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const voterApi = createApi({
  reducerPath: "voterApi",
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
  tagTypes: "Voters",
  endpoints: (builder) => ({
    getAllVoters: builder.query({
      query: () => "voters",
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getNumVoters: builder.query({
      query: () => "voters/count",
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    deleteVoter: builder.mutation({
      query: (id) => ({
        url: `/voters/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Voters"],
      transformErrorResponse: (response, meta, org) => response.data,
    }),
  }),
});

export const {
  useGetAllVotersQuery,
  useDeleteVoterQuery,
  useGetNumVotersQuery,
} = voterApi;

export const votersSlice = createSlice({
  name: "voters",
  initialState: {
    voters: [
      {
        id: 1,
        name: "Brycen Masmo",
        phone_number: "255624327900",
        country: "Tanzania",
        voted: false,
      },
      {
        id: 2,
        name: "Brycen Masmo",
        phone_number: "255624327900",
        country: "Tanzania",
        voted: true,
      },
      {
        id: 3,
        name: "Brycen Masmo",
        phone_number: "255624327900",
        country: "Tanzania",
        voted: true,
      },
      {
        id: 4,
        name: "Brycen Masmo",
        phone_number: "255624327900",
        country: "Tanzania",
        voted: false,
      },
      {
        id: 5,
        name: "Brycen Masmo",
        phone_number: "255624327900",
        country: "Tanzania",
        voted: true,
      },
      {
        id: 6,
        name: "Brycen Masmo",
        phone_number: "255624327900",
        country: "Tanzania",
        voted: true,
      },
      {
        id: 7,
        name: "Brycen Masmo",
        phone_number: "255624327900",
        country: "Tanzania",
        voted: true,
      },
    ],
    token: "",
    userId: null,
    voter: {
      name: "",
      phone_number: "",
      pinId: "",
    },
  },
  reducers: {
    setVoters: (state, payload) => {
      state.voters = [];
    },
    setVoter: (state, votee) => {
      state.voter = votee;
      console.log("Inside setVoter reducer", votee);
    },
    setUserToken: (state, token) => {
      console.log("Voter slice: setting voter token", token.payload);
      state.token = token.payload;
    },
    setUserId: (state, id) => {
      console.log("Voter slice: setting voter id", id.payload);
      state.userId = id.payload;
    },
    setPinId: (state, action) => {
      state.voter["pinId"] = action.payload;
    },
  },
});

export function fetchVoters() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/voters");
      dispatch(votersSlice.actions.setVoters(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}

export const { setVoter } = votersSlice.actions;
export const { setPinId } = votersSlice.actions;
export const { setUserToken } = votersSlice.actions;
export const { setUserId } = votersSlice.actions;
export default votersSlice.reducer;
