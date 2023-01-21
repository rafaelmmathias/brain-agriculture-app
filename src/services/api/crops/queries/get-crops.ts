import { gql } from "graphql-request";

export const getCropsQuery = gql`
  query GetCrops {
    soilTypes
  }
`;
