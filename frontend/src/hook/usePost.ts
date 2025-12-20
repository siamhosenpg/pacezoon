"use client";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
  getPostsByUserId,
  getFeedPosts,
} from "@/lib/post/feedPosts";
import { useAuth } from "@/hook/useAuth";

export const usePost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const currentUserId = user?.user?._id;

  // ----------------------------
  // 🟢 Create Post (UPLOAD READY)
  // ----------------------------
  const createPostMutation = useMutation({
    mutationFn: async ({ data }: { data: FormData }) => {
      if (!currentUserId) throw new Error("Unauthorized: Login required");

      // 🔥 FormData directly send
      return createPost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // ----------------------------
  // 🟡 Update Post
  // ----------------------------
  const updatePostMutation = useMutation({
    mutationFn: async ({ postId, updatedData, postUserId }: any) => {
      if (currentUserId !== postUserId) throw new Error("Unauthorized");

      return updatePost(postId, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // ----------------------------
  // 🔴 Delete Post
  // ----------------------------
  const deletePostMutation = useMutation({
    mutationFn: async ({ postid, postUserId }: any) => {
      if (currentUserId !== postUserId) throw new Error("Unauthorized");

      return deletePost(postid);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // ----------------------------
  // 🔵 Queries
  // ----------------------------
  const profilePost = (userid?: string) =>
    useQuery({
      queryKey: ["posts", userid],
      queryFn: () => getPostsByUserId(userid!),
      enabled: !!userid,
    });

  const singlePost = (postId?: string) =>
    useQuery({
      queryKey: ["posts", postId],
      queryFn: () => getSinglePost(postId!),
      enabled: !!postId,
    });

  const feedPost = () =>
    useQuery({
      queryKey: ["posts"],
      queryFn: getFeedPosts,
    });

  return {
    // 🔥 expose mutate with callback support
    createPost: (
      data: any,
      options?: {
        onSuccess?: () => void;
        onError?: (err: any) => void;
      }
    ) =>
      createPostMutation.mutate(
        { data },
        {
          onSuccess: () => {
            options?.onSuccess?.();
          },
          onError: (err) => {
            options?.onError?.(err);
          },
        }
      ),

    createPostLoading: createPostMutation.isPending,

    updatePost: updatePostMutation.mutate,
    updatePostLoading: updatePostMutation.isPending,

    deletePost: deletePostMutation.mutate,
    deletePostLoading: deletePostMutation.isPending,

    profilePost,
    singlePost,
    feedPost,
  };
};
