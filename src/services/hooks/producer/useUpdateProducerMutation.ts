import { useQueryClient } from "@tanstack/react-query";
import { Producer } from "@/models/producer";
import { updateProducer } from "@/services/api";
import { useMutationBase } from "@/services/core/use-mutation-base";

export const useUpdateProducerMutation = () => {
  const queryClient = useQueryClient();
  return useMutationBase<Producer, Producer>(updateProducer, {
    onSuccess: (data) => {
      const currentData = queryClient.getQueryData<Producer[]>(["producers"]);
      if (currentData) {
        const producers = currentData.map((item) =>
          item.id === data.id ? data : item
        );
        queryClient.setQueryData(["producers"], producers);
      }
      queryClient.setQueryData(["producer", data.id], data);
    },
  });
};
