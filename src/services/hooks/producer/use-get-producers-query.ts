import { Producer } from "@/models/producer";
import { useQueryBase, usePrefetch } from "@/services/core";
import { getProducers } from "@/services/api";

export const useGetProducersQuery = () => {
  return useQueryBase<Producer[]>("producers", getProducers);
};

export const usePrefetchProducers = () => {
  return usePrefetch<Producer[]>("producers", getProducers);
};
