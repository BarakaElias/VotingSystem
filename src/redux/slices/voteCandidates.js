import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const voteCandidateApi = createApi({
  reducerPath: "voteCandidateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getAllVoteCandidates: builder.query({
      query: () => "vote-candidates",
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    createVoteCandidate: builder.mutation({
      query: (cand) => ({
        url: "vote-candidates",
        method: "POST",
        body: JSON.stringify({ params: cand }),
      }),
      invalidatesTags: ["Candidates"],
    }),
    deleteVoteCandidate: builder.mutation({
      query: (id) => ({
        url: "vote-candidates",
        method: "DELETE",
        body: { id: id },
      }),
      invalidatesTags: ["Candidates"],
    }),
  }),
});

export const {
  useGetAllVoteCandidatesQuery,
  useCreateVoteCandidateMutation,
  useDeleteVoteCandidateMutation,
} = voteCandidateApi;

export const voteCandidatesSlice = createSlice({
  name: "voteCandidates",
  initialState: {
    voteCandidates: [
      {
        id: 1,
        title: "Afya Lifetime Achievement Award",
        candidates: [
          {
            id: 1,
            name: "Baraka Urio",
            company: "Aim Firms Ltd",
            image: "",
          },
          {
            id: 2,
            name: "Isaac Urio",
            company: "Aim Firms Ltd",
            image: "",
          },
          {
            id: 3,
            name: "Angel Walter",
            company: "BB Advocates",
            image: "",
          },
        ],
      },
      {
        id: 2,
        title: "Award of Excellence in Specialized Healthcare",
        candidates: [
          {
            id: 4,
            name: "Elias Gor",
            company: "Andela",
            image: "",
          },
          {
            id: 5,
            name: "Cliff Gor",
            company: "Andela",
            image: "",
          },
          {
            id: 6,
            name: "Peculier Umeh",
            company: "Andela",
            image: "",
          },
          {
            id: 7,
            name: "Peculier Umeh",
            company: "Andela",
            image: "",
          },
          {
            id: 8,
            name: "Peculier Umeh",
            company: "Andela",
            image: "",
          },
        ],
      },
    ],
  },
  reducers: {
    setVoteCandidates: (state, payload) => {
      state.voteCandidates = [];
    },
  },
});

export function fetchVoteCandidates() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/vote-candidates");
      dispatch(voteCandidatesSlice.actions.setVoteCandidates(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}

export default voteCandidatesSlice.reducer;
