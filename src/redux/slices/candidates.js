import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import useAuth from "../../contexts/JWTContext";
import axios from "axios";

export const candidateApi = createApi({
  reducerPath: "candidateApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    mode: "cors",
    credentials: "include",
    // prepareHeaders: (headers, { getState }) => {
    //   console.log("Candidates auth: ", getState());
    //   const token = getState().authSlice.token;
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   console.log("Candidate rtk: ", headers);
    //   return headers;
    // },
  }),
  tagTypes: ["Candidates"],
  endpoints: (builder) => ({
    getAllCandidates: builder.query({
      query: () => "candidates",
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: ["Candidates"],
    }),
    addCandidate: builder.mutation({
      query: (candidate) => ({
        url: "candidates",
        method: "POST",
        body: JSON.stringify({ params: candidate }),
      }),
      transformErrorResponse: (response, meta, arg) => response.data,
      invalidatesTags: ["Candidates"],
    }),
    addCandidateProfilePic: builder.mutation({
      query: (values) => {
        console.log("Inside nominations rtk: ", values);
        console.log("Inside rtk: ", values);
        const fd = new FormData();
        fd.append("profile_pic", values.profile_pic);
        fd.append("candidate_id", values.candidate_id);
        return {
          url: "candidates/profile_pic",
          method: "POST",
          body: fd,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        };
      },
      transformErrorResponse: (response, meta, arg) => response.data,
      invalidatesTags: ["Candidates"],
    }),
    deleteCandidate: builder.mutation({
      query: (tid) => ({
        url: `candidates/${tid}`,
        method: "DELETE",
        body: { id: tid },
      }),
      invalidatesTags: ["Candidates"],
    }),
    getCandidatesNum: builder.query({
      query: () => "candidates/count/count",
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getCandidate: builder.query({
      query: (id) => `/candidates/${id}`,
    }),
  }),
});

export const {
  useGetAllCandidatesQuery,
  useGetCandidatesNumQuery,
  useDeleteCandidateMutation,
  useAddCandidateMutation,
  useAddCandidateProfilePicMutation,
} = candidateApi;

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
