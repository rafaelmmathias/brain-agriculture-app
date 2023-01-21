import { Crops } from "../../../models/producer";
import { getCropsFetcher } from "../../api";
import { ConfigOptions, useQueryBase } from "../../core";

export const useGetCropsQuery = (config: ConfigOptions<Crops[]> = {}) => {
  return useQueryBase<Crops[]>("crops", getCropsFetcher, undefined, config);
};
