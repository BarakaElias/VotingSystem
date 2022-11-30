import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import useAuth from "../../contexts/JWTContext";
import axios from "axios";

export const candidateApi = createApi({
  reducerPath: "candidateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3001/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;

      // const token =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJiYXJha2FAYWltZmlybXMuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjY5NDY5MjYyLCJleHAiOjE2Njk0NzI4NjJ9.1YpQMafOuo60gj0TxvMWSlrW6ZdizGESQXWtFGEAo0w";
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Candidates"],
  endpoints: (builder) => ({
    getAllCandidates: builder.query({
      query: () => "candidates",
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: ["Candidates"],
    }),
    getCandidate: builder.query({
      query: (id) => `/candidates/${id}`,
    }),
  }),
});

export const { useGetAllCandidatesQuery } = candidateApi;

export const candidatesSlice = createSlice({
  name: "candidates",
  initialState: {
    candidates: [
      {
        id: 1,
        category: "Lifetime Achivement Award",
        name: "Baraka Urio",
        company: "Aim Firms",
        title: "Mr",
        company_address: "Sam Nujoma Rd, Sinza, Dar es Salaam",
        phone_number: "255624327900",
        email: "baraka@aimfirms.com",
      },
      {
        id: 2,
        category: "Award of Excellence in Specialized Healthcare",
        name: "Isaac Urio",
        company: "Aim Firms",
        title: "Mr",
        company_address: "Sam Nujoma Rd, Sinza, Dar es Salaam",
        phone_number: "255624327900",
        email: "baraka@aimfirms.com",
      },
      {
        id: 3,
        category: "Award of Excellence in Specialized Healthcare",
        name: "Angel Walter",
        company: "BB Advocates",
        title: "Mrs",
        company_address: "Sam Nujoma Rd, Sinza, Dar es Salaam",
        phone_number: "255624327900",
        email: "baraka@aimfirms.com",
      },
      {
        id: 4,
        name: "Elias Gor",
        company: "Andela",
        category: "Award of Excellence in Specialized Healthcare",
        image: "",
        title: "Mr",
        company_address: "Sam Nujoma Rd, Sinza, Dar es Salaam",
        phone_number: "255624327900",
        email: "baraka@aimfirms.com",
      },
      {
        id: 5,
        name: "Cliff Gor",
        company: "Andela",
        category: "Award of Excellence in Specialized Healthcare",
        image: "",
        title: "Dr",
        company_address: "Sam Nujoma Rd, Sinza, Dar es Salaam",
        phone_number: "255624327900",
        email: "baraka@aimfirms.com",
      },
      {
        id: 6,
        name: "Steve Harvy",
        company: "Andela",
        image: "",
        title: "Mr",
        company_address: "Sam Nujoma Rd, Sinza, Dar es Salaam",
        phone_number: "255624327900",
        category: "Award of Excellence in Specialized Healthcare",
        email: "baraka@aimfirms.com",
      },
      {
        id: 7,
        name: "Jason Statham",
        company: "Andela",
        category: "Award of Excellence in Specialized Healthcare",
        image: "",
        title: "Mr",
        company_address: "Sam Nujoma Rd, Sinza, Dar es Salaam",
        phone_number: "255624327900",
        email: "baraka@aimfirms.com",
      },
      {
        id: 8,
        name: "Peculier Umeh",
        company: "Andela",
        image: "",
        category: "Award of Excellence in Specialized Healthcare",
        title: "Ms",
        company_address: "Sam Nujoma Rd, Sinza, Dar es Salaam",
        phone_number: "255624327900",
        email: "peculier@andela.com",
      },
    ],
  },
  reducers: {
    setCandidates: (state, payload) => {
      state.candidates = [];
    },
  },
});

export function fetchCandidates() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/candidates");
      dispatch(candidatesSlice.actions.setCandidates(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}

export default candidatesSlice.reducer;
