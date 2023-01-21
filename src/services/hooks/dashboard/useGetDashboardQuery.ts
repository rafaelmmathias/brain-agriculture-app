import { Dashboard } from "../../../models/dashboard";
import { getDashboardFetcher } from "../../../services/api";
import { useQueryBase } from "../../../services/core";

export const useGetDashboardQuery = () => {
  return useQueryBase<Dashboard>("dashboard", getDashboardFetcher);
};
