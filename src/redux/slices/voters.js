import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const votersSlice = createSlice({
  name: "voters",
  initialState: {
    voters: [
      {
        id: 1,
        name: "Brycen Masmo",
        phone_number: "255624327900",
        country: "Tanzania",
        voted: false,
      },
      {
        id: 2,
        name: "Brycen Masmo",
        phone_number: "255624327900",
        country: "Tanzania",
        voted: true,
      },
      {
        id: 3,
        name: "Brycen Masmo",
        phone_number: "255624327900",
        country: "Tanzania",
        voted: true,
      },
      {
        id: 4,
        name: "Brycen Masmo",
        phone_number: "255624327900",
        country: "Tanzania",
        voted: false,
      },
      {
        id: 5,
        name: "Brycen Masmo",
        phone_number: "255624327900",
        country: "Tanzania",
        voted: true,
      },
      {
        id: 6,
        name: "Brycen Masmo",
        phone_number: "255624327900",
        country: "Tanzania",
        voted: true,
      },
      {
        id: 7,
        name: "Brycen Masmo",
        phone_number: "255624327900",
        country: "Tanzania",
        voted: true,
      },
    ],
  },
  reducers: {
    setVoters: (state, payload) => {
      state.candidates = [];
    },
  },
});

export function fetchVoters() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/voters");
      dispatch(votersSlice.actions.setVoters(response.data));
    } catch (e) {
      console.log(e);
    }
  };
}

export default votersSlice.reducer;
