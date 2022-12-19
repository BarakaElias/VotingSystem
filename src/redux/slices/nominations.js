import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const nominationApi = createApi({
  reducerPath: "nominationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}nominations`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Nominations",
    "IndividualNominations",
    "OrganizationNominations",
    "Questions",
  ],
  endpoints: (builder) => ({
    getAllNominations: builder.query({
      query: () => "nominations",
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getNomination: builder.query({
      query: (id) => `/nominations/${id}`,
    }),
    getIndividualNominations: builder.query({
      query: () => "individual-nominations",
      providesTags: ["IndividualNominations"],
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getOrganizationNominations: builder.query({
      query: () => "organization-nominations",
      providesTags: ["OrganizationNominations"],
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    addIndividualNomination: builder.mutation({
      query: (individualNomination) => ({
        url: "individual-nomination",
        method: "POST",
        body: { params: { ...individualNomination } },
      }),
      invalidatesTags: ["IndividualNominations"],
    }),
    addOrganizationNomination: builder.mutation({
      query: (organizationNomination) => ({
        url: "organization-nomination",
        method: "POST",
        body: { params: { ...organizationNomination } },
      }),
      invalidatesTags: ["OrganizationNominations"],
    }),
    addNominationQuestion: builder.mutation({
      query: (question) => ({
        url: "nomination-question",
        method: "POST",
        body: { params: question },
      }),
      invalidatesTags: ["Questions"],
    }),
    getAllNominationQuestions: builder.query({
      query: () => "nomination-questions",
      transformErrorResponse: (res, meta, arg) => res.status,
      providesTags: ["Questions"],
    }),
    getIndividualQuestions: builder.query({
      query: () => "individual-questions",
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: ["Questions"],
    }),
    getOrganizationQuestions: builder.query({
      query: () => "organization-questions",
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: ["Questions"],
    }),
    deleteNominationQuestion: builder.mutation({
      query: (id) => ({
        url: "nomination-question",
        method: "DELETE",
        body: { params: id },
      }),
      invalidatesTags: ["Questions"],
    }),
  }),
});

export const {
  useGetAllNominationsQuery,
  useGetNominationQuery,
  useGetIndividualNominationsQuery,
  useGetOrganizationNominationsQuery,
  useAddIndividualNominationMutation,
  useAddOrganizationNominationMutation,
  useAddNominationQuestionMutation,
  useGetIndividualQuestionsQuery,
  useGetOrganizationQuestionsQuery,
  useGetAllNominationQuestionsQuery,
  useDeleteNominationQuestionMutation,
} = nominationApi;

export const nominationsSlice = createSlice({
  name: "nominations",
  initialState: {
    nominations: [
      {
        id: 1,
        nominator: "Brycen Masmo",
        nominator_title: "Mr",
        nominator_phonenumber: "255692463373",
        nominator_company: "Bryce Corps",
        nominator_email: "bryce@brycecorps.com",
        nominee: "Baraka Urio",
        nominee_title: "Mr",
        nominee_company_address: "Sam Nujoma, Dar es Salaam, Arusha",
        nominee_company: "Aim Firms",
        nominee_email: "baraka@aimfirms.com",
        nominee_phonenumber: "255624327900",
        category: "Afya Lifetime Achievement Award",
        questions: [
          {
            id: 1,
            question:
              "What makes this indidvidual stand out when compared to his or her peers in the healthcare sector?",
            answer:
              "The thing that makes this individual stand out is becuase lorem ipsum dolar sit at met. Unsplash from the assets images that contains photos from unsplash. This is meant to fill up the space of the",
          },
          {
            id: 2,
            question:
              "How would you objectively quantify the achievements of the nominee?",
            answer:
              "The thing that makes this individual stand out is becuase lorem ipsum dolar sit at met. Unsplash from the assets images that contains photos from unsplash. This is meant to fill up the space of the",
          },
          {
            id: 3,
            question:
              "What are some of the nominee's notable achievments over the last year or so?",
            answer:
              "The thing that makes this individual stand out is becuase lorem ipsum dolar sit at met. Unsplash from the assets images that contains photos from unsplash. This is meant to fill up the space of the",
          },
        ],
      },
    ],
  },
  reducers: {
    setNominations: (state, payload) => {
      state.nominations = [];
    },
  },
});

export function fetchNominations() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/voters");
      dispatch(nominationsSlice.actions.setNominations(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}

export default nominationsSlice.reducer;
