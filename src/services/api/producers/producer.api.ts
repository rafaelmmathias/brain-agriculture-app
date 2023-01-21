import { Producer } from "models/producer";
import { gqlRequest } from "../gql-client";
import { createProducerMutation } from "./mutations";
import { getProducerQuery, getProducersQuery } from "./queries";

export type ProducerParams = {
  id: string;
};

export const createProducerFetcher = (producer: Producer) =>
  gqlRequest<Producer[], { producer: Producer }>(createProducerMutation, {
    producer,
  });

export const getProducerFetcher = (params: ProducerParams) =>
  gqlRequest<Producer, ProducerParams>(getProducerQuery, params);

export const getProducersFetcher = () =>
  gqlRequest<Producer[]>(getProducersQuery);
