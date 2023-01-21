import { Producer } from "./../../../models/producer";
import { useQueryBase, usePrefetch } from "../../core";
import { getProducersFetcher } from "../../api";

export const useGetProducersQuery = () => {
  return useQueryBase<Producer[]>("producers", getProducersFetcher);
};

export const usePrefetchProducers = () => {
  return usePrefetch<Producer[]>("producers", getProducersFetcher);
};
