import { useQueryClient } from "@tanstack/react-query";
import { Producer } from "@/models/producer";
import { deleteProducer, ProducerParams } from "@/services/api";
import { useMutationBase } from "@/services/core/use-mutation-base";

export const useDeleteProducerMutation = () => {
  const queryClient = useQueryClient();
  return useMutationBase<Producer[], ProducerParams>(deleteProducer, {
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(["producers"], data);
      queryClient.removeQueries(["producer", { id }]);
      queryClient.invalidateQueries(["dashboard"]);
    },
  });
};
