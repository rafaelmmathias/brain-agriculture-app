import { Dashboard } from "../../models/dashboard";
import { useQueryBase } from "../base-hooks/use-query-base";
import { getDashboardQuery } from "../queries";

export const useGetDashboardQuery = () => {
  return useQueryBase<Dashboard>("dashboard", getDashboardQuery);
};
