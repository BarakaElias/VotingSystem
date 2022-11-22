import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slices/counter";
import userReducer from "./slices/user";
import candidatesReducer from "./slices/candidates";
import votersReducer from "./slices/voters";
import awardCategories from "./slices/awardCategories";
import votes from "./slices/votes";
import nominations from "./slices/nominations";

export const store = configureStore({
  reducer: {
    user: userReducer,
    candidates: candidatesReducer,
    voters: votersReducer,
    awardCategories: awardCategories,
    votes: votes,
    nominations: nominations,
  },
});
