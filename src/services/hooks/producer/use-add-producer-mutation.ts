import { useQueryClient } from "@tanstack/react-query";
import { Producer } from "@/models/producer";
import { createProducer } from "@/services/api/producers";
import { useMutationBase } from "@/services/core/use-mutation-base";

export const useCreateProducerMutation = () => {
  const queryClient = useQueryClient();
  return useMutationBase<Producer[], Producer>(createProducer, {
    onSuccess: (data) => {
      queryClient.setQueryData(["producers"], data);
    },
  });
};
