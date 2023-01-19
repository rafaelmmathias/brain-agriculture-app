import { Producer } from "../../models/producer";
import { useQueryBase } from "../base-hooks/use-query-base";
import { getProducerQuery } from "../queries";

export type ProducerParams = {
  id: string;
};

export const useGetProducerQuery = (id: string) => {
  return useQueryBase<Producer, ProducerParams>("producer", getProducerQuery, {
    id,
  });
};
