import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { API_BASE_URL_GRAPH_QL } from "../../config";
import { Producer } from "../../models/producer";

const endpoint = API_BASE_URL_GRAPH_QL;
const fetchProducer = async (id: string) => {
  const data = await request<Producer>(
    endpoint,
    gql`
      query GetProducer($id: Int!) {
        getProducer(id: $id) {
          id
          name
        }
      }
    `,
    { id }
  );

  return data;
};
export const useGetProducerQuery = (id: string) => {
  return useQuery<Producer, Error, Producer>(["producer", id], () =>
    fetchProducer(id)
  );
};
