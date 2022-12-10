import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import io from "socket.io-client";

export const resultApi = createApi({
  reducerPath: "resultApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),
  tagTypes: ["Results"],
  endpoints: (builder) => ({
    getResults: builder.query({
      query: () => "results",
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        //Create a websocket
        const ws = new WebSocket("ws://127.0.0.1:3001/");
        try {
          //wait for the initial query to resolve before proceeding
          console.log("Inside rtk results subscription");
          await cacheDataLoaded;
          console.log("Awaited cached data");

          const listener = (event) => {
            const data = JSON.parse(event.data);
            console.log("Rtk sub from ws:", data);

            updateCachedData((draft) => {
              draft.push(data);
            });
          };

          ws.addEventListener("message", listener);
          console.log("Passed the listener");
        } catch (err) {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
          console.log("REsults rtk Error:", err);
        }
        await cacheEntryRemoved;
      },
    }),
  }),
});

export const { useGetResultsQuery } = resultApi;
