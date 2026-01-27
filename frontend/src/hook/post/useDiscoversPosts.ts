import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

import {
  getDiscoversPostsApi,
  getDiscoversPostsByUserApi,
  DiscoverPostResponse,
} from "@/lib/post/discoverApi";

export const useDiscoversPosts = (limit: number = 8) => {
  return useInfiniteQuery<DiscoverPostResponse, Error>({
    queryKey: ["media-posts"],
    queryFn: ({ pageParam = 0 }) =>
      getDiscoversPostsApi({ skip: pageParam as number, limit }),
    getNextPageParam: (lastPage) => lastPage.nextSkip ?? undefined,
    staleTime: 1000 * 60, // 1 min cache
    initialPageParam: 0, // **important** for TypeScript
  });
};
export const useUserMediaPosts = (userid: string) => {
  return useQuery({
    queryKey: ["media-posts", userid],
    queryFn: () => getDiscoversPostsByUserApi(userid),
    enabled: !!userid,
  });
};
