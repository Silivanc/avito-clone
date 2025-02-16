import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Ad, Ads } from "../types/ad.types";

export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ["Ads"],
  endpoints: (builder) => ({
    getAds: builder.query<Ads, void>({
      query: () => ({
        url: "items",
      }),
      providesTags: ["Ads"],
    }),
    createAd: builder.mutation<Ads, Omit<Ad, "id">>({
      query: (body) => ({
        url: "items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Ads"],
    }),
  }),
});

export const { useCreateAdMutation, useGetAdsQuery } = adsApi;
