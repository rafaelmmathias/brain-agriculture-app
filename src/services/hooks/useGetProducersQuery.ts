import { Producer } from "./../../models/producer";
import { useQueryBase } from "../base-hooks/use-query-base";
import { getProducersQuery } from "../queries/get-producers";

export const useGetProducersQuery = () => {
  return useQueryBase<Producer[]>("producers", getProducersQuery);
};
