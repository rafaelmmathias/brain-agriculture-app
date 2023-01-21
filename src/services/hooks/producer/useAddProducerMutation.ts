import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Producer } from "../../../models/producer";
import { createProducerFetcher } from "../../api/producers";

export const useCreateProducerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Producer[], Error, Producer>(createProducerFetcher, {
    onSuccess: (data) => {
      queryClient.setQueryData(["producers"], data);
    },
  });
};
