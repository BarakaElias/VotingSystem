import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timezoneListSlice = createSlice({
  name: "timezones",
  initialState: {
    values: [{}],
  },
  reducers: {
    setTimeZones: (state, action) => {
      state.values = action.payload;
    },
  },
});

export default timezoneListSlice.reducer;

export function retrieveTimeZones() {
  const auth = {
    username: "",
    password: "",
  };
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://api.sema.co.tz/api/GetTimeZoneList",
        { auth: auth }
      );
      dispatch(timezoneListSlice.actions.setTimeZones(response.data));
    } catch (err) {
      console.log("Timezon list", err);
    }
  };
}
