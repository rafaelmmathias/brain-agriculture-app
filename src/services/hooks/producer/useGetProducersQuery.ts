import { Producer } from "@/models/producer";
import { useQueryBase, usePrefetch } from "@/services/core";
import { getProducersFetcher } from "@/services/api";

export const useGetProducersQuery = () => {
  return useQueryBase<Producer[]>("producers", getProducersFetcher);
};

export const usePrefetchProducers = () => {
  return usePrefetch<Producer[]>("producers", getProducersFetcher);
};
