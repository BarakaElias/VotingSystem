import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const votesSlice = createSlice({
  name: "votes",
  initialState: {
    votes: [
      {
        id: 1,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 2,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 3,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 4,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 5,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 6,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 7,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 8,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 9,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 10,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 11,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 12,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 13,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 14,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 15,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
      {
        id: 16,
        category: "Lifetime Achivement Award",
        candidate: "Walter Mkoma",
        voter: "Amani Peace",
      },
    ],
  },
  reducers: {
    setVotes: (state, payload) => {
      state.votes = [];
    },
  },
});

export function fetchVotes() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/votes");
      dispatch(votesSlice.actions.setVotes(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}

export default votesSlice.reducer;
