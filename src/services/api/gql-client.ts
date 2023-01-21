import { RequestDocument, GraphQLClient } from "graphql-request";
import { API_BASE_URL_GRAPH_QL } from "config";

export const graphQLClient = new GraphQLClient(API_BASE_URL_GRAPH_QL);

export function gqlRequest<T>(document: RequestDocument): Promise<T>;
export function gqlRequest<T, TParams extends object>(
  document: RequestDocument,
  params: TParams
): Promise<T>;

export function gqlRequest<T, TParams extends object>(
  document: RequestDocument,
  params?: TParams
) {
  return graphQLClient.request<T>(document, params);
}
