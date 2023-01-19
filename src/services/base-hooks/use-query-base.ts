import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { ClientError, RequestDocument } from "graphql-request";
import { graphQLClient } from "./graphql-client";
type QueryKeyT = [string, object | undefined];
type Error = ClientError;
export type ConfigOptions<T> = UseQueryOptions<T, Error, T, QueryKeyT>;

export function useQueryBase<T>(
  queryKey: string | null,
  document: RequestDocument
): UseQueryResult<T, Error>;

export function useQueryBase<T>(
  queryKey: string | null,
  document: RequestDocument,
  params: null | undefined,
  config: ConfigOptions<T>
): UseQueryResult<T, Error>;

export function useQueryBase<T, TParams extends object>(
  queryKey: string | null,
  document: RequestDocument,
  params: TParams
): UseQueryResult<T, Error>;

export function useQueryBase<T, TParams extends object>(
  queryKey: string | null,
  document: RequestDocument,
  params: TParams,
  config: ConfigOptions<T>
): UseQueryResult<T, Error>;

export function useQueryBase<T, TParams extends object>(
  queryKey: string | null,
  document: RequestDocument,
  params?: TParams,
  config?: ConfigOptions<T>
) {
  let keys: QueryKeyT = [queryKey!, params];

  const context = useQuery<T, Error, T, QueryKeyT>(
    keys,
    () => graphQLClient.request<T>(document, params),
    {
      enabled: !!keys,
      retry: false,
      keepPreviousData: true,
      useErrorBoundary: (error, query) => {
        if (error.response.status === 401) {
          query.invalidate();
          return true;
        }
        return false;
      },
      ...config,
    }
  );

  return context;
}
