import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const countryListSlice = createSlice({
  name: "country_list",
  initialState: {
    values: [{}],
  },
  reducers: {
    setCountryList: (state, action) => {
      state.values = action.payload;
    },
  },
});

export default countryListSlice.reducer;

export function retrieveCountryList() {
  const auth = {
    username: "",
    password: "",
  };
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://api.sema.co.tz/api/GetCountryList",
        { auth: auth }
      );
      dispatch(countryListSlice.actions.setCountryList(response.data));
    } catch (err) {
      console.log("Country list fetching", err);
    }
  };
}
