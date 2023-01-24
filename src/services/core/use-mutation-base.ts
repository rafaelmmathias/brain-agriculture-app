import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ClientError } from "graphql-request";

export function useMutationBase<T, ParamsT extends object>(
  fetcher: (params: ParamsT) => Promise<T>,
  options?: UseMutationOptions<T, ClientError, ParamsT>
) {
  return useMutation<T, ClientError, ParamsT>(fetcher, options);
}
