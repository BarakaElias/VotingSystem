import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3001/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authSlice.token;
      console.log("api slice", token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Categories", "IndividualCategories", "OrganizationCategories"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "categories",
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: [
        "Categories",
        "IndividualCategories",
        "OrganizationCategories",
      ],
    }),
    getNumberOfCategories: builder.query({
      query: () => "categories/count",
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    getIndividualCategories: builder.query({
      query: () => "categories/individual",
      transformErrorResponse: (response, meta, arg) => response.status,
      providesTags: ["IndividualCategories"],
    }),
    getOrganizationCategories: builder.query({
      query: () => "categories/organization",
      transformResponse: (response, meta, arg) => response.status,
      providesTags: ["OrganizationCategories"],
    }),
    addCategory: builder.mutation({
      query: ({ ...category }) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
      transformErrorResponse: (response, meta, org) => response.status,
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: "/categories",
        method: "DELETE",
        body: { id: id },
      }),
      invalidatesTags: [
        "Categories",
        "IndividualCategories",
        "OrganizationCategories",
      ],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useLazyGetAllCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetNumberOfCategoriesQuery,
  useGetIndividualCategoriesQuery,
  useGetOrganizationCategoriesQuery,
} = categoryApi;

export const awardCategoriesSlice = createSlice({
  name: "awardCategories",
  initialState: {
    awardCategories: [
      {
        id: 1,
        title: "Lifetime Achievement Award",
        description:
          "Recognizes an individual who has demonstrated excellence and an ipact on increasing access to quality healthcare over the course of their career in Tanzania",
        date_created: "2020-11-19 ",
        candidates: "10",
        actions: "",
      },
      {
        id: 2,
        title: "Award of Excellence in Specialized Healthcare",
        description:
          "Recognizes an individual who has demonstrated excellence and an ipact on increasing access to quality healthcare over the course of their career in Tanzania",
        date_created: "2020-11-19 ",
        candidates: "10",
        actions: "",
      },
      {
        id: 3,
        title: "Lifetime Achievement Award",
        description:
          "Recognizes an individual who has demonstrated excellence and an ipact on increasing access to quality healthcare over the course of their career in Tanzania",
        date_created: "2020-11-19 ",
        candidates: "10",
        actions: "",
      },
      {
        id: 4,
        title: "Lifetime Achievement Award",
        description:
          "Recognizes an individual who has demonstrated excellence and an ipact on increasing access to quality healthcare over the course of their career in Tanzania",
        date_created: "2020-11-19 ",
        candidates: "10",
        actions: "",
      },
      {
        id: 5,
        title: "Lifetime Achievement Award",
        description:
          "Recognizes an individual who has demonstrated excellence and an ipact on increasing access to quality healthcare over the course of their career in Tanzania",
        date_created: "2020-11-19 ",
        candidates: "10",
        actions: "",
      },
      {
        id: 6,
        title: "Lifetime Achievement Award",
        description:
          "Recognizes an individual who has demonstrated excellence and an ipact on increasing access to quality healthcare over the course of their career in Tanzania",
        date_created: "2020-11-19 ",
        candidates: "10",
        actions: "",
      },
    ],
  },
  reducers: {
    setCategories: (state, payload) => {
      state.awardCategories = [];
    },
  },
});

export function fetchCategories() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/categories");
      dispatch(awardCategoriesSlice.actions.setCategories(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}

export default awardCategoriesSlice.reducer;
