import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRepliesByComment } from "@/lib/post/comments";
import { GetRepliesResponse } from "@/lib/post/comments";

import axiosInstance from "@/lib/axios";

export const useCommentCount = (postId: string) => {
  return useQuery({
    queryKey: ["commentCount", postId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/comments/count/${postId}`);
      return res.data.count;
    },
    enabled: !!postId,
  });
};

export const useGetComments = (postId: string, page: number = 1) => {
  return useQuery({
    queryKey: ["comments", postId, page],
    queryFn: async () => {
      const res = await axiosInstance.get(`/comments/${postId}?page=${page}`);
      return res.data.data;
    },
    enabled: !!postId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      postId: string;
      text: string;
      parentCommentId?: string;
    }) => {
      const res = await axiosInstance.post("/comments", data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      const { postId, parentCommentId } = variables;

      if (parentCommentId) {
        // It's a reply → invalidate replies query
        queryClient.invalidateQueries({
          queryKey: ["replies", parentCommentId],
        });
      } else {
        // Main comment → invalidate comments query
        queryClient.invalidateQueries({
          queryKey: ["comments", postId],
        });
      }
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { commentId: string; text: string }) => {
      const res = await axiosInstance.put(`/comments/${data.commentId}`, {
        text: data.text,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      const res = await axiosInstance.delete(`/comments/${commentId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
  });
};

interface UseRepliesParams {
  commentId: string;
  page?: number;
  limit?: number;
}

export const useCommentsReplies = ({
  commentId,
  page = 1,
  limit = 20,
}: UseRepliesParams) => {
  return useQuery<GetRepliesResponse, Error>({
    queryKey: ["replies", commentId, page, limit],
    queryFn: () => getRepliesByComment({ commentId, page, limit }),
    staleTime: 1000 * 60, // 1 minute
    enabled: Boolean(commentId),
  });
};
