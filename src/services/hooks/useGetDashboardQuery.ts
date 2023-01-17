import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { API_BASE_URL_GRAPH_QL } from "../../config";
import { Dashboard } from "../../models/dashboard";

const endpoint = API_BASE_URL_GRAPH_QL;
const fetchDashboard = async () => {
  const data = await request<Dashboard>(
    endpoint,
    gql`
      query GetDashboard {
        soilTypes
      }
    `
  );

  return data;
};
export const useGetDashboardQuery = () => {
  return useQuery<Dashboard, unknown>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });
};
