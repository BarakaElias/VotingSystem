import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
        category: "Outstanding Leadership in Health Award",
        name: "Isaac Urio",
        company: "Aim Firms",
        title: "Mr",
        company_address: "Sam Nujoma Rd, Sinza, Dar es Salaam",
        phone_number: "255624327900",
        email: "baraka@aimfirms.com",
      },
      {
        id: 3,
        category: "Award for Excellence in community Health Work",
        name: "Angel Walter",
        company: "Aim Firms",
        title: "Mrs",
        company_address: "Sam Nujoma Rd, Sinza, Dar es Salaam",
        phone_number: "255624327900",
        email: "baraka@aimfirms.com",
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
