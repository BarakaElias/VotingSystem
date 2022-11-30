import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import counterReducer from "./slices/counter";
import userReducer from "./slices/user";
import candidatesReducer from "./slices/candidates";
import votersReducer from "./slices/voters";
import awardCategories from "./slices/awardCategories";
import votes from "./slices/votes";
import nominations from "./slices/nominations";
import voteCandidates from "./slices/voteCandidates";
import awardCycles, { awardCycleApi } from "./slices/awardCycles";
import authSlice from "./slices/authSlice";

//RTK QUERY
import { candidateApi } from "./slices/candidates";
import { categoryApi } from "./slices/awardCategories";
import { nominationApi } from "./slices/nominations";
import { voteCandidateApi } from "./slices/voteCandidates";
import { voterApi } from "./slices/voters";
import { voteApi } from "./slices/votes";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// export const store = configureStore({

// })

export const store = configureStore({
  reducer: {
    user: userReducer,
    candidates: candidatesReducer,
    voters: votersReducer,
    awardCategories: awardCategories,
    votes: votes,
    nominations: nominations,
    voteCandidates: voteCandidates,
    awardCycles: awardCycles,
    [candidateApi.reducerPath]: candidateApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [nominationApi.reducerPath]: nominationApi.reducer,
    [voteCandidateApi.reducerPath]: voteCandidateApi.reducer,
    [voterApi.reducerPath]: voterApi.reducer,
    [voteApi.reducerPath]: voteApi.reducer,
    [awardCycleApi.reducerPath]: awardCycleApi.reducer,
    authSlice: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      candidateApi.middleware,
      categoryApi.middleware,
      nominationApi.middleware,
      voteCandidateApi.middleware,
      voterApi.middleware,
      voteApi.middleware,
      awardCycleApi.middleware,
    ]),
});

setupListeners(store.dispatch);
