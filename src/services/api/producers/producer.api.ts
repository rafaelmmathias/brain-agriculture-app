import { Producer } from "@/models/producer";
import { gqlRequest } from "../gql-client";
import { createProducerMutation, deleteProducerMutation } from "./mutations";
import { getProducerQuery, getProducersQuery } from "./queries";

export type ProducerParams = {
  id: string;
};

export const createProducer = (producer: Producer) =>
  gqlRequest<Producer[], { producer: Producer }>(createProducerMutation, {
    producer,
  });

export const getProducer = (params: ProducerParams) =>
  gqlRequest<Producer, ProducerParams>(getProducerQuery, params);

export const getProducers = () => gqlRequest<Producer[]>(getProducersQuery);

export const deleteProducer = (params: ProducerParams) =>
  gqlRequest<Producer[], ProducerParams>(deleteProducerMutation, {
    id: params.id,
  });
