import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import io from "socket.io-client";
import Pusher from "pusher-js";

export const resultApi = createApi({
  reducerPath: "resultApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}votes`,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().authSlice.token;
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["Results"],
  endpoints: (builder) => ({
    getResults: builder.query({
      query: () => "results",
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        console.log("pusher here");
        const pusher = new Pusher("baa1a0b2b190bf92b670", {
          cluster: "eu",
        });
        const channel = pusher.subscribe("vote-result");
        try {
          // await cacheDataLoaded;

          channel.bind("vote-result", (data) => {
            console.log("RTK: ", data);
            updateCachedData((draft) => {
              draft.push(data);
            });
          });
        } catch (e) {
          console.log("RTK STREAMING: ", e);
        }
        await cacheEntryRemoved;
      },
    }),
  }),
});

export const { useGetResultsQuery } = resultApi;
