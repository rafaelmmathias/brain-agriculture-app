import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { API_BASE_URL_GRAPH_QL } from "../../config";
import { Crops } from "../../models/producer";

const endpoint = API_BASE_URL_GRAPH_QL;
const fetchCrops = async () => {
  const data = await request<Crops[]>(
    endpoint,
    gql`
      query GetCrops {
        soilTypes
      }
    `
  );

  return data;
};
export const useGetCropsQuery = () => {
  return useQuery<Crops[], Error>({
    queryKey: ["crops"],
    queryFn: fetchCrops,
  });
};
