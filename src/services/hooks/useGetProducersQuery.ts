import { Producer } from "./../../models/producer";
import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { API_BASE_URL_GRAPH_QL } from "../../config";

const endpoint = API_BASE_URL_GRAPH_QL;
const fetchProducers = async () => {
  const data = await request<Producer[]>(
    endpoint,
    gql`
      query GetProducers {
        soilTypes
      }
    `
  );

  return data;
};
export const useGetProducersQuery = () => {
  return useQuery<Producer[], unknown>({
    queryKey: ["producers"],
    queryFn: fetchProducers,
  });
};
