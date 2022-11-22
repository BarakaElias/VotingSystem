import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
        title: "Lifetime Achievement Award",
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
