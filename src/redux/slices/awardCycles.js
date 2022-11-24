import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
