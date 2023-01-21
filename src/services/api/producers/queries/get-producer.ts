import { gql } from "graphql-request";

export const getProducerQuery = gql`
  query GetProducer($id: Int!) {
    getProducer(id: $id) {
      id
      name
    }
  }
`;
