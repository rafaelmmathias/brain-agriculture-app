import { Dashboard } from "@/models/dashboard";
import { getDashboardQuery } from "./queries";
import { gqlRequest } from "../gql-client";

export const getDashboardFetcher = () =>
  gqlRequest<Dashboard>(getDashboardQuery);
