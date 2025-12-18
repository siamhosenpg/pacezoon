import { useQuery } from "@tanstack/react-query";

import { getPeopleSuggestions } from "@/lib/user/peopleApi";

export const usePeopleSuggestions = () => {
  return useQuery({
    queryKey: ["people-suggestions"],
    queryFn: getPeopleSuggestions,
    staleTime: 1000 * 60 * 5, // 5 min cache
    retry: 1,
  });
};
