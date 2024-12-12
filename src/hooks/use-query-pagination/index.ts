import {
  InfiniteData,
  keepPreviousData,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useSetSearchParams } from "../use-search-params";
import {
  IQueryPaginationResponse,
  ListResponseData,
  QueryFn,
  QueryPaginationProps,
} from "./types";

export function useQueryPagination<T>(
  props: QueryPaginationProps<T>
): IQueryPaginationResponse<T> {
  const { queryKey, fn, disableFetch = false, ...rest } = props;
  const { setParams } = useSetSearchParams();

  const queryFn = async (props?: QueryFn) => {
    if (disableFetch) return;
    return await fn(props);
  };

  const getQueryKey = () => {
    const keys = queryKey.filter((value) => value);

    return keys;
  };

  const select = (
    data?: InfiniteData<ListResponseData<T> | undefined, number>
  ) => {
    if (!data) return undefined;

    return {
      ...data.pages.slice(-1)[0],
      data: data.pages.flatMap((page) => {
        if (!page?.data) return [];

        return [...page.data];
      }),
    };
  };

  const {
    data: response,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isError,
    refetch,
  } = useInfiniteQuery({
    ...rest,
    queryFn,
    queryKey: getQueryKey(),
    initialPageParam: 1,
    getNextPageParam: (data) => data?.next || undefined,
    getPreviousPageParam: (data) => data?.prev || undefined,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    select,
  });

  const nextPage = async () => {
    if (isFetching) return;
    if (hasNextPage) {
      setParams({ name: "page", value: String(response?.next) });
    }
  };

  const prevPage = async () => {
    if (isFetching) return;
    if (hasPreviousPage) {
      setParams({ name: "page", value: String(response?.prev) });
    }
  };

  const setSizePerPage = (size?: number) => {
    if (isFetching) return;
    setParams([
      { name: "page", value: size ? "1" : undefined },
      { name: "size", value: size ? String(size) : undefined },
    ]);
  };

  return {
    data: response?.data || [],
    isLoading,
    isLoadingAll:
      isLoading || isFetching || isFetchingNextPage || isFetchingPreviousPage,
    isError,
    currentPage: response?.currentPage,
    totalPages: response?.totalPages,
    next: response?.next,
    prev: response?.prev,
    nextPage,
    prevPage,
    setSizePerPage,
    refetch: async () => {
      await refetch();
    },
  };
}
