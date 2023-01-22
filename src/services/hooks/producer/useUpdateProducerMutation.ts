import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { API_BASE_URL_GRAPH_QL } from "@/config";
import { Producer } from "@/models/producer";

const endpoint = API_BASE_URL_GRAPH_QL;
const updateProducer = async (producer: Producer) => {
  const data = await request<Producer>(
    endpoint,
    gql`
      mutation UpdateProducer($producer: Producer!) {
        updateProducer(producer: $producer) {
          name
        }
      }
    `,
    { producer }
  );

  return data;
};
export const useUpdateProducerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Producer, Error, Producer>(updateProducer, {
    onSuccess: (data) => {
      const currentData = queryClient.getQueryData<Producer[]>(["producers"]);
      if (currentData) {
        const producers = currentData.map((item) =>
          item.id === data.id ? data : item
        );
        queryClient.setQueryData(["producers"], producers);
      }
      queryClient.setQueryData(["producer", data.id], data);
    },
  });
};
