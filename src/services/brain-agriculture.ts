import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config";
import { Dashboard } from "../models/dashboard";
import { Crops, Producer } from "../models/producer";

export const brainAgricultureApi = createApi({
  reducerPath: "brainAgricultureApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Producer", "Dashboard"],
  endpoints: (builder) => ({
    getDashboard: builder.query<Dashboard, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
    getProducers: builder.query<Producer[], void>({
      query: () => "/producers",
      providesTags: ["Producer"],
    }),
    getProducer: builder.query<void, string>({
      query: (document) => `/producers/${document}`,
      providesTags: ["Producer"],
    }),
    addProducer: builder.mutation<void, Producer>({
      query: (producer) => ({
        url: "/producers",
        method: "POST",
        body: producer,
      }),
      invalidatesTags: ["Dashboard", "Producer"],
    }),
    updateProducer: builder.mutation<void, Producer>({
      query: ({ document, ...rest }) => ({
        url: `/producers/${document}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Dashboard", "Producer"],
    }),
    deleteProducer: builder.mutation<void, string>({
      query: (document) => ({
        url: `/producers/${document}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Producer", "Dashboard"],
    }),
    getCrops: builder.query<Crops[], void>({
      query: () => `/crops`,
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetProducersQuery,
  useAddProducerMutation,
  useUpdateProducerMutation,
  useDeleteProducerMutation,
  useGetProducerQuery,
  useGetCropsQuery
} = brainAgricultureApi;
