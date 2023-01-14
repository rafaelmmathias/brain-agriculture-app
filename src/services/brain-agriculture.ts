import { brainAgricultureApi } from "./rest/brain-agriculture";
import { brainAgricultureApiGraphQL } from "./graphql/brain-agriculture";
import { API_TYPE } from "../config";

export const apis = {
  graphql: brainAgricultureApiGraphQL,
  rest: brainAgricultureApi,
};

type Type = typeof brainAgricultureApi | typeof brainAgricultureApiGraphQL;
type BrainAPI = (api?: "rest" | "graphql") => any;

export const getApi: BrainAPI = () => {
  return (API_TYPE === "graphql" ? apis.graphql : apis.rest) as Type;
};

export const {
  useGetDashboardQuery,
  useGetProducersQuery,
  useAddProducerMutation,
  useUpdateProducerMutation,
  useDeleteProducerMutation,
  useGetProducerQuery,
  useGetCropsQuery,
} = getApi();
