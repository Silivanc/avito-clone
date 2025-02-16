import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Ad, Ads } from "../types/ad.types";

export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Ads"],
  endpoints: (builder) => ({
    getAds: builder.query<Ads, void>({
      query: () => ({
        url: "items",
      }),
      providesTags: ["Ads"],
    }),
    getAd: builder.query<Ad, Pick<Ad, "id">>({
      query: ({ id }) => ({
        url: `items/${id}`,
      }),
      providesTags: (result, error, { id }) => [{ type: "Ads", id }],
    }),
    createAd: builder.mutation<Ads, Omit<Ad, "id">>({
      query: (body) => ({
        url: "items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Ads"],
    }),
    updateAd: builder.mutation<Ad, { id: number; body: Omit<Ad, "id"> }>({
      query: ({ id, body }) => ({
        url: `items/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Ads", id }],
    }),
    deleteAd: builder.mutation<void, Pick<Ad, "id">>({
      query: ({ id }) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ads"],
    }),
  }),
});

export const {
  useGetAdsQuery,
  useGetAdQuery,
  useCreateAdMutation,
  useUpdateAdMutation,
  useDeleteAdMutation,
} = adsApi;
