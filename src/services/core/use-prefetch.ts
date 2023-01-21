import { FetchQueryOptions, useQueryClient } from "@tanstack/react-query";
import { ClientError } from "graphql-request";
const isConfig = <T>(arg: any): arg is FetchQueryOptions<T, ClientError> => {
  return arg?.initialData ? true : false;
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
      // params = unde;
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
