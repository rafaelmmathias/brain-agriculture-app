import { gql } from "graphql-request";

export const deleteProducerMutation = gql`
  mutation DeleteProducer($id: Int!) {
    deleteProducer(id: $id) {
      name
    }
  }
`;
