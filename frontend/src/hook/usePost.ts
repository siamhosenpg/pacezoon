"use client";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  createPost,
  updatePost,
  deletePost,
  getSinglePost,
  getPostsByUserId,
  getFeedPosts,
  sharePost, // 🟢 NEW
} from "@/lib/post/feedPosts";
import { useAuth } from "@/hook/useAuth";
import { PostTypes } from "@/types/postType";

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
      return createPost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  // ----------------------------
  // 🟢 Share Post (TEXT ONLY)
  // ----------------------------
  const sharePostMutation = useMutation({
    mutationFn: async ({
      parentPost,
      caption,
      privacy,
    }: {
      parentPost: string;
      caption?: string;
      privacy?: "public" | "friends" | "private";
    }) => {
      if (!currentUserId) throw new Error("Unauthorized: Login required");

      return sharePost({
        parentPost,
        caption,
        privacy,
      });
    },

    // 🔥 Instantly update feed
    onSuccess: (newPost) => {
      queryClient.setQueryData<PostTypes[]>(["posts"], (old) =>
        old ? [newPost, ...old] : [newPost]
      );
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

  // ----------------------------
  // 🔥 Exposed API
  // ----------------------------
  return {
    // Create
    createPost: (
      data: FormData,
      options?: {
        onSuccess?: () => void;
        onError?: (err: any) => void;
      }
    ) =>
      createPostMutation.mutate(
        { data },
        {
          onSuccess: () => options?.onSuccess?.(),
          onError: (err) => options?.onError?.(err),
        }
      ),

    createPostLoading: createPostMutation.isPending,

    // 🟢 Share
    sharePost: (
      data: {
        parentPost: string;
        caption?: string;
        privacy?: "public" | "friends" | "private";
      },
      options?: {
        onSuccess?: () => void;
        onError?: (err: any) => void;
      }
    ) =>
      sharePostMutation.mutate(data, {
        onSuccess: () => options?.onSuccess?.(),
        onError: (err) => options?.onError?.(err),
      }),

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
    feedPost,
  };
};
