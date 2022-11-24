import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
            company: "Aim Firms Ltd, Developer",
            image: "",
          },
          {
            id: 2,
            name: "John Doe",
            company: "Kick R Design",
            image: "",
          },
          {
            id: 3,
            name: "Rachel John",
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
