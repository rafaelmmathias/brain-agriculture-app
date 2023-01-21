import { Dashboard } from "../../../models/dashboard";
import { getDashboardFetcher } from "../../api";
import { useQueryBase } from "../../core";

export const useGetDashboardQuery = () => {
  return useQueryBase<Dashboard>("dashboard", getDashboardFetcher);
};
