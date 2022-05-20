import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config";
import { Dashboard } from "../models/dashboard";
import { Producer } from "../models/producer";

export const brainAgricultureApi = createApi({
  reducerPath: "brainAgricultureApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["Producer", "Dashboard"],
  endpoints: (builder) => ({
    getDashboard: builder.query<Dashboard, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
    addProducer: builder.mutation<void, Producer>({
      query: (producer) => ({
        url: "/producers",
        method: "POST",
        body: producer,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    updateProducer: builder.mutation<void, Producer>({
      query: ({ document, ...rest }) => ({
        url: `/producers/${document}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    deleteProducer: builder.mutation<void, string>({
      query: (document) => ({
        url: `/producers/${document}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useAddProducerMutation,
  useUpdateProducerMutation,
  useDeleteProducerMutation,
} = brainAgricultureApi;
