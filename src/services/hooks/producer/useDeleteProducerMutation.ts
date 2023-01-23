import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Producer } from "@/models/producer";
import { deleteProducer, ProducerParams } from "@/services/api";

export const useDeleteProducerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<Producer[], Error, ProducerParams>(deleteProducer, {
    onSuccess: (data, { id }) => {
      queryClient.setQueryData(["producers"], data);
      queryClient.removeQueries(["producer", { id }]);
      queryClient.invalidateQueries(["dashboard"]);
    },
  });
};
