import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { API_BASE_URL_GRAPH_QL } from "../../config";
import { Producer } from "../../models/producer";

const endpoint = API_BASE_URL_GRAPH_QL;
const createProducer = async (producer: Producer) => {
  const data = await request<Producer[]>(
    endpoint,
    gql`
      mutation CreateProducer($producer: Producer!) {
        createProducer(producer: $producer) {
          name
        }
      }
    `,
    { producer }
  );

  return data;
};
export const useAddProducerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Producer[], Error, Producer>(createProducer, {
    onSuccess: (data) => {
      queryClient.setQueryData(["producers"], data);
    },
  });
};
