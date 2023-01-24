import { gql } from "graphql-request";

export const updateProducerMutation = gql`
  mutation UpdateProducer($producer: Producer!) {
    updateProducer(producer: $producer) {
      name
    }
  }
`;
