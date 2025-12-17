import { useQuery } from "@tanstack/react-query";
import { fetchGlobalSearch, SearchResponse } from "@/lib/otherapi/search";

export const useGlobalSearch = (query: string) => {
  return useQuery<SearchResponse>({
    queryKey: ["globalSearch", query],
    queryFn: () => fetchGlobalSearch(query),
    enabled: !!query,
    staleTime: 5 * 60 * 1000,
  });
};
