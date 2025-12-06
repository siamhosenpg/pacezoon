"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, updatePost, deletePost } from "@/lib/post/feedPosts";
import { useAuth } from "@/hook/useAuth";

export const usePost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const currentUserId = user?.user?._id;

  if (!currentUserId) {
    console.warn("User not logged in. Post actions disabled.");
  }

  // ----------------------------
  // 🟢 Create Post
  // ----------------------------
  const createPostMutation = useMutation({
    mutationFn: async (postData: any) => {
      if (!currentUserId) throw new Error("Unauthorized: Login required");
      return await createPost({
        ...postData,
        userid: currentUserId, // logged-in user ID attach
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // ----------------------------
  // 🟡 Update Post
  // ----------------------------
  const updatePostMutation = useMutation({
    mutationFn: async ({
      postId,
      updatedData,
      postUserId,
    }: {
      postId: string;
      updatedData: any;
      postUserId: string;
    }) => {
      if (!currentUserId) throw new Error("Unauthorized: Login required");

      // 🔐 Only post owner can update
      if (currentUserId !== postUserId) {
        throw new Error("Unauthorized: You can't update another user's post");
      }

      return await updatePost(postId, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // ----------------------------
  // 🔴 Delete Post
  // ----------------------------
  const deletePostMutation = useMutation({
    mutationFn: async ({
      postid,
      postUserId,
    }: {
      postid: string;
      postUserId: string;
    }) => {
      if (!currentUserId) throw new Error("Unauthorized: Login required");

      // 🔐 Only owner can delete post
      if (currentUserId !== postUserId) {
        throw new Error("Unauthorized: You can't delete another user's post");
      }

      return await deletePost(postid);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return {
    createPost: createPostMutation.mutate,
    createPostLoading: createPostMutation.isPending,

    updatePost: updatePostMutation.mutate,
    updatePostLoading: updatePostMutation.isPending,

    deletePost: deletePostMutation.mutate,
    deletePostLoading: deletePostMutation.isPending,
  };
};
