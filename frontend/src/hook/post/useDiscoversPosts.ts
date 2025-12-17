import { useQuery } from "@tanstack/react-query";

import {
  getDiscoversPostsApi,
  getDiscoversPostsByUserApi,
} from "@/lib/post/discoverApi";

export const useDiscoversPosts = () => {
  return useQuery({
    queryKey: ["media-posts"],
    queryFn: getDiscoversPostsApi,
    staleTime: 1000 * 60, // 1 min cache
  });
};

export const useUserMediaPosts = (userid: string) => {
  return useQuery({
    queryKey: ["media-posts", userid],
    queryFn: () => getDiscoversPostsByUserApi(userid),
    enabled: !!userid,
  });
};
