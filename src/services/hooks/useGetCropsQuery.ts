import { Crops } from "../../models/producer";
import { ConfigOptions, useQueryBase } from "../base-hooks/use-query-base";
import { getCropsQuery } from "../queries";

export const useGetCropsQuery = (config: ConfigOptions<Crops[]> = {}) => {
  return useQueryBase<Crops[]>("crops", getCropsQuery, undefined, config);
};
