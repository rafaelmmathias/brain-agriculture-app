import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { API_BASE_URL_GRAPH_QL } from "@/config";
import { Producer } from "@/models/producer";
import { ProducerParams } from "@/services/api";

const endpoint = API_BASE_URL_GRAPH_QL;
const deleteProducer = async ({ id }: ProducerParams) => {
  const data = await request<Producer[]>(
    endpoint,
    gql`
      mutation DeleteProducer($id: Int!) {
        deleteProducer(id: $id) {
          name
        }
      }
    `,
    { id }
  );

  return data;
};

export const useDeleteProducerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Producer[], Error, ProducerParams>(deleteProducer, {
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(["producers"], data);
      queryClient.removeQueries(["producer", { id }]);
      queryClient.invalidateQueries(["dashboard"]);
    },
  });
};
