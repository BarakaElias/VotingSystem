import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const voterApi = createApi({
  reducerPath: "voterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3001/",
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).auth.token;
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJiYXJha2FAYWltZmlybXMuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY5NDY5MjYyLCJleHAiOjE2Njk0NzI4NjJ9.1YpQMafOuo60gj0TxvMWSlrW6ZdizGESQXWtFGEAo0w";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllVoters: builder.query({
      query: () => "voters",
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    deleteVoter: builder.mutation({
      query: (id) => ({
        url: `/voters/${id}`,
        method: "POST",
      }),
      transformErrorResponse: (response, meta, org) => response.data,
    }),
  }),
});

export const { useGetAllVotersQuery, useDeleteVoterQuery } = voterApi;

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
export default votersSlice.reducer;
