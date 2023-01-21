import { gql } from "graphql-request";

export const getDashboardQuery = gql`
  query GetDashboard {
    soilTypes
  }
`;
