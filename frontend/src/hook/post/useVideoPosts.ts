import { useQuery } from "@tanstack/react-query";
import { getVideoPostsApi, getVideoPostsByUserApi } from "@/lib/post/videosapi";

/* =======================
   Hooks
======================= */

// 🔥 All video posts
export const useVideoPosts = () => {
  return useQuery({
    queryKey: ["video-posts"],
    queryFn: getVideoPostsApi,
    staleTime: 1000 * 60, // 1 minute cache
  });
};

// 🔥 Video posts by user
export const useVideoPostsByUser = (userid?: string) => {
  return useQuery({
    queryKey: ["video-posts", userid],
    queryFn: () => getVideoPostsByUserApi(userid as string),
    enabled: !!userid, // userid না থাকলে call হবে না
    staleTime: 1000 * 60,
  });
};
