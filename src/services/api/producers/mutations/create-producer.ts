import { gql } from "graphql-request";

export const createProducerMutation = gql`
  mutation CreateProducer($producer: Producer!) {
    createProducer(producer: $producer) {
      name
    }
  }
`;
