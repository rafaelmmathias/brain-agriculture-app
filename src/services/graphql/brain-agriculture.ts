import { createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL_GRAPH_QL } from "../../config";
import { Dashboard } from "../../models/dashboard";
import { Crops, Producer } from "../../models/producer";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { gql } from "graphql-request";

export const brainAgricultureApiGraphQL = createApi({
  reducerPath: "brainAgricultureApiGraphQL",
  baseQuery: graphqlRequestBaseQuery({ url: API_BASE_URL_GRAPH_QL || "" }),
  tagTypes: ["Producer", "Dashboard"],
  endpoints: (builder) => ({
    getDashboard: builder.query<Dashboard, void>({
      query: () => ({
        document: gql`
          query GetDashboard {
            soilTypes
          }
        `,
      }),
      providesTags: ["Dashboard"],
    }),
    getProducers: builder.query<Producer[], void>({
      query: () => ({
        document: gql`
          query GetProducers {
            producer
          }
        `,
      }),
      providesTags: ["Producer"],
    }),
    getProducer: builder.query<void, string>({
      query: (id) => ({
        document: gql`
          query GetProducer($id: Int!) {
            getProducer(id: $id) {
              id
              name
            }
          }
        `,
        variables: {
          id,
        },
      }),
      providesTags: ["Producer"],
    }),
    addProducer: builder.mutation<void, Producer>({
      query: (producer) => ({
        document: gql`
          mutation CreateProducer($producer: Producer!) {
            createProducer(producer: $producer) {
              name
            }
          }
        `,
        variables: {
          producer,
        },
      }),
      invalidatesTags: ["Dashboard", "Producer"],
    }),
    updateProducer: builder.mutation<void, Producer>({
      query: (producer) => ({
        document: gql`
          mutation UpdateProducer($producer: Producer!) {
            updateProducer(producer: $producer) {
              name
            }
          }
        `,
        variables: {
          producer,
        },
      }),
      invalidatesTags: ["Dashboard", "Producer"],
    }),
    deleteProducer: builder.mutation<void, string>({
      query: (id) => ({
        document: gql`
          mutation DeleteProducer($id: Int!) {
            deleteProducer(id: $id) {
              name
            }
          }
        `,
        variables: {
          id,
        },
      }),
      invalidatesTags: ["Producer", "Dashboard"],
    }),
    getCrops: builder.query<Crops[], void>({
      query: () => ({
        document: gql`
          query GetCrops {
            name
          }
        `,
      }),
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
  useGetCropsQuery,
} = brainAgricultureApiGraphQL;
