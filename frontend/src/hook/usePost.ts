"use client";

import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import {
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
  getPostsByUserId,
  getFeedPosts,
  sharePost,
  getPostCountByUser,
  PostCountResponse,
} from "@/lib/post/feedPosts";
import { useAuth } from "@/hook/useAuth";
import { PostTypes } from "@/types/postType";

// ----------------------------
// TypeScript types
// ----------------------------
interface CreatePostData {
  data: FormData;
}

interface SharePostData {
  parentPost: string;
  caption?: string;
  privacy?: "public" | "friends" | "private";
}

interface UpdatePostData {
  postId: string;
  updatedData: Partial<PostTypes>;
  postUserId: string;
}

interface DeletePostData {
  postId: string;
  postUserId: string;
}

// API return type
interface FetchPostsResponse {
  posts: PostTypes[];
  nextCursor: string | null;
}
// ----------------------------
// Hook
// ----------------------------
export const usePost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const currentUserId = user?.user?._id;

  // ----------------------------
  // Create Post Mutation
  // ----------------------------
  const createPostMutation = useMutation({
    mutationFn: async ({ data }: CreatePostData) => {
      if (!currentUserId) throw new Error("Unauthorized: Login required");
      return createPost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedPosts"] });
    },
  });

  // ----------------------------
  // Share Post Mutation
  // ----------------------------
  const sharePostMutation = useMutation({
    mutationFn: async (data: SharePostData) => {
      if (!currentUserId) throw new Error("Unauthorized: Login required");
      return sharePost(data);
    },
    onSuccess: (newPost: PostTypes) => {
      queryClient.setQueryData<{ pages: PostTypes[][]; pageParams: any[] }>(
        ["feedPosts"],
        (old: any) => {
          if (!old) return { pages: [[newPost]], pageParams: [undefined] };
          const updatedPages = [...old.pages];
          updatedPages[0] = [newPost, ...updatedPages[0]];
          return { ...old, pages: updatedPages };
        },
      );
    },
  });

  // ----------------------------
  // Update Post Mutation
  // ----------------------------
  const updatePostMutation = useMutation({
    mutationFn: async ({ postId, updatedData, postUserId }: UpdatePostData) => {
      if (currentUserId !== postUserId) throw new Error("Unauthorized");
      return updatePost(postId, updatedData);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["feedPosts"] }),
  });

  // ----------------------------
  // Delete Post
  // ----------------------------
  const deletePostMutation = useMutation({
    mutationFn: async ({ postId, postUserId }: DeletePostData) => {
      if (!postId) throw new Error("Post ID missing");
      if (currentUserId !== postUserId) throw new Error("Unauthorized");
      return deletePost(postId);
    },

    onSuccess: (_, variables) => {
      // 🔥 1. Update MAIN FEED
      queryClient.setQueryData(["feedPosts"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.filter(
              (post: PostTypes) => post._id !== variables.postId,
            ),
          })),
        };
      });

      // 🔥 2. Update PROFILE FEED
      queryClient.setQueryData(
        ["feedPosts", variables.postUserId],
        (old: any) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              posts: page.posts.filter(
                (post: PostTypes) => post._id !== variables.postId,
              ),
            })),
          };
        },
      );
    },
  });
  // ----------------------------
  // Queries
  // ----------------------------
  const profilePost = (userid?: string) =>
    useInfiniteQuery<FetchPostsResponse, Error>({
      queryKey: ["feedPosts", userid],
      queryFn: ({ pageParam = null }) =>
        getPostsByUserId(userid!, pageParam, 10),
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      enabled: !!userid,
      staleTime: 1000 * 60 * 2,
      cacheTime: 1000 * 60 * 10,
    });

  const singlePost = (postId?: string) =>
    useQuery({
      queryKey: ["posts", postId],
      queryFn: () => getSinglePost(postId!),
      enabled: !!postId,
    });

  // ----------------------------
  // Infinite Scroll Feed
  // ----------------------------
  const feedPost = () =>
    useInfiniteQuery<FetchPostsResponse, Error>({
      queryKey: ["feedPosts"],
      queryFn: ({ pageParam = null }) => getFeedPosts(pageParam, 10), // cursor + limit
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      staleTime: 1000 * 60 * 2,
      cacheTime: 1000 * 60 * 10,
    });

  // ----------------------------
  // Post Count Query
  // ----------------------------

  // ----------------------------
  // Exposed API
  // ----------------------------
  return {
    // Create
    createPost: (
      data: FormData,
      options?: { onSuccess?: () => void; onError?: (err: any) => void },
    ) => createPostMutation.mutate({ data }, options),

    createPostLoading: createPostMutation.isPending,

    // Share
    sharePost: (
      data: SharePostData,
      options?: { onSuccess?: () => void; onError?: (err: any) => void },
    ) => sharePostMutation.mutate(data, options),

    sharePostLoading: sharePostMutation.isPending,

    // Update
    updatePost: updatePostMutation.mutate,
    updatePostLoading: updatePostMutation.isPending,

    // Delete
    deletePost: deletePostMutation.mutate,
    deletePostLoading: deletePostMutation.isPending,

    // Queries
    profilePost,
    singlePost,
    feedPost, // Infinite Scroll ready
  };
};

export const useUserPostCount = (userid?: string) =>
  useQuery<PostCountResponse, Error>({
    queryKey: ["post-count", userid],
    queryFn: () => {
      if (!userid) throw new Error("UserId is required");
      return getPostCountByUser(userid);
    },
    enabled: !!userid,
    staleTime: 1000 * 60, // 1 min cache
  });
