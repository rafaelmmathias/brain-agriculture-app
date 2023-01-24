import { FetchQueryOptions, useQueryClient } from "@tanstack/react-query";
import { ClientError } from "graphql-request";
const isConfig = <T>(arg: any): arg is FetchQueryOptions<T, ClientError> => {
  const configKeys = [
    "behavior",
    "cacheTime",
    "getNextPageParam",
    "getPreviousPageParam",
    "initialData",
    "initialDataUpdatedAt",
    "isDataEqual",
    "meta",
    "networkMode",
    "_defaulted",
    "queryFn",
    "queryHash",
    "queryKey",
    "queryKeyHashFn",
    "retry",
    "retryDelay",
    "staleTime",
    "structuralSharing",
  ];

  const keys = Object.keys(arg || {});

  return keys.some((key) => configKeys.includes(key));
};

export function usePrefetch<T>(
  queryKey: string,
  fetcher: () => Promise<T>
): (config?: FetchQueryOptions<T, ClientError>) => void;

export function usePrefetch<T, TParams extends object>(
  queryKey: string,
  fetcher: (params: TParams) => Promise<T>
): (params: TParams, config?: FetchQueryOptions<T, ClientError>) => void;

export function usePrefetch<T, TParams extends object>(
  queryKey: string,
  fetcher: (params?: TParams) => Promise<T>
) {
  const queryClient = useQueryClient();
  return (
    arg1?: TParams | FetchQueryOptions<T, ClientError>,
    config?: FetchQueryOptions<T, ClientError>
  ) => {
    let params: TParams | undefined;
    if (!isConfig(arg1)) {
      params = arg1 as TParams;
    }
    const keys = params ? [queryKey, params] : [queryKey];

    queryClient.prefetchQuery<T, ClientError>(
      keys,
      () => fetcher(params),
      config
    );
  };
}
