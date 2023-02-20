import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const awardCycleApi = createApi({
  reducerPath: "awardCycleApi",
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
  tagTypes: ["AwardCycles"],
  endpoints: (builder) => ({
    getAllAwardCycles: builder.query({
      query: () => "award-cycles",
      providesTags: ["AwardCycles"],
      transformErrorResponse: (response, meta, arg) => response.status,
    }),
    createAwardCycle: builder.mutation({
      query: (award_cycle) => ({
        url: "award-cycles",
        method: "POST",
        body: JSON.stringify({ params: award_cycle }),
      }),
      invalidatesTags: ["AwardCycles"],
    }),
    updateAwardCycle: builder.mutation({
      query: (award_cycle) => ({
        url: "award-cycles",
        method: "UPDATE",
        body: JSON.stringify({ params: award_cycle }),
      }),
      invalidatesTags: ["AwardCycles"],
    }),
    deleteAwardCycle: builder.mutation({
      query: (id) => ({
        url: `award-cycles/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["AwardCycles"],
    }),
  }),
});
export const { useGetAllAwardCyclesQuery, useCreateAwardCycleMutation } =
  awardCycleApi;

export const awardCyclesSlice = createSlice({
  name: "awardCycles",
  initialState: {
    awardCycles: [
      {
        id: 1,
        title: "2023 Awards",
        created: "12/11/2022 18:00 PM",
        judges: "John Doe, Nate Diaz, Jim Rivers",
        description:
          "Award Cycle means the one or more periods of time, as the Committee may select",
        state: "Active",
      },
      {
        id: 2,
        title: "2022 Awards",
        created: "12/11/2022 18:00 PM",
        judges: "John Doe, Nate Diaz, Jim Rivers",
        description:
          "Award Cycle means the one or more periods of time, as the Committee may select",
        state: "",
      },
      {
        id: 3,
        title: "2020 Awards",
        created: "12/11/2022 18:00 PM",
        judges: "John Doe, Nate Diaz, Jim Rivers",
        description:
          "Award Cycle means the one or more periods of time, as the Committee may select",
        state: "",
      },
    ],
  },
  reducers: {
    setAwardCycles: (state, payload) => {
      state.awardCycles = [];
    },
  },
});

export function fetchAwardCycles() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/award-cycles");
      dispatch(awardCyclesSlice.actions.setAwardCycles(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}

export default awardCyclesSlice.reducer;
