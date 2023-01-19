import { GraphQLClient } from "graphql-request";
import { API_BASE_URL_GRAPH_QL } from "../../config";

export const graphQLClient = new GraphQLClient(API_BASE_URL_GRAPH_QL);
