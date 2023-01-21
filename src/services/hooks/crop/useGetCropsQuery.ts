import { Crops } from "../../../models/producer";
import { getCropsFetcher } from "../../../services/api";
import { ConfigOptions, useQueryBase } from "../../../services/core";

export const useGetCropsQuery = (config: ConfigOptions<Crops[]> = {}) => {
  return useQueryBase<Crops[]>("crops", getCropsFetcher, undefined, config);
};
