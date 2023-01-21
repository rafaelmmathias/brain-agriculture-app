import { gql } from "graphql-request";

export const getProducersQuery = gql`
  query GetProducers {
    soilTypes
  }
`;
