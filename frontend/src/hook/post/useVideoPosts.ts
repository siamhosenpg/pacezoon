import { useInfiniteQuery } from "@tanstack/react-query";
import { getVideoPostsApi } from "@/lib/post/videosapi";

import { getVideoPostsByUserApi } from "@/lib/post/videosapi";

export const useVideoPosts = () => {
  return useInfiniteQuery({
    queryKey: ["video-posts"],
    queryFn: ({ pageParam }) =>
      getVideoPostsApi({ pageParam: pageParam ?? undefined }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60, // 1 min
    initialPageParam: null,
  });
};

export const useVideoPostsByUser = (userid?: string) => {
  return useInfiniteQuery({
    queryKey: ["video-posts", userid],
    queryFn: ({ pageParam }) =>
      getVideoPostsByUserApi({
        pageParam,
        userid: userid as string,
      }),
    enabled: !!userid,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60,
    initialPageParam: null,
  });
};
