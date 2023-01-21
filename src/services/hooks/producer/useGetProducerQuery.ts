import { Producer } from "../../../models/producer";
import { getProducerFetcher, ProducerParams } from "../../../services/api";
import { usePrefetch, useQueryBase } from "../../../services/core";

export const useGetProducerQuery = (id: string) => {
  return useQueryBase<Producer, ProducerParams>(
    "producer",
    getProducerFetcher,
    {
      id,
    }
  );
};

export const usePrefetchProducer = () => {
  return usePrefetch<Producer, ProducerParams>("producer", getProducerFetcher);
};
