import { Producer } from "@/models/producer";
import { getProducer, ProducerParams } from "@/services/api";
import { usePrefetch, useQueryBase } from "@/services/core";

export const useGetProducerQuery = (id: string) => {
  return useQueryBase<Producer, ProducerParams>(
    "producer",
    getProducer,
    {
      id,
    }
  );
};

export const usePrefetchProducer = () => {
  return usePrefetch<Producer, ProducerParams>("producer", getProducer);
};
