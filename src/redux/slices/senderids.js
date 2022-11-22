import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState = {
//   sender_ids: [
//     { sender_id: "PETWASH", countr: "Tanzania" },
//     { sender_id: "LICKS", country: "Tanzania" },
//   ],
// };

const senderIDSlice = createSlice({
  name: "sender_ids",
  initialState: {
    values: [
      { sender_id: "PETWASH", countr: "Tanzania" },
      { sender_id: "LICKS", country: "Tanzania" },
    ],
  },
  reducers: {
    setSenderIDs: (state, action) => {
      state.values = action.payload;
    },
  },
});

export default senderIDSlice.reducer;

export function retrieveSenderIDs() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://api.sema.co.tz/api/GetSenderIDList",
        {
          params: { api_id: "API213160153", api_password: "ForDemoClient123" },
        }
      );

      // const response = await axios.get(
      //   "http://localhost/semaapi/public/api/list_users",
      //   { params: { company_id: "2020" } }
      // );
      dispatch(senderIDSlice.actions.setSenderIDs(response.data));
      console.log("Getting IDs", response);
    } catch (err) {
      console.log("Sender id", err);
    }
  };
}
