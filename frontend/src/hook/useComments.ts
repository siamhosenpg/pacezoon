import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    mutationFn: async (data: { postId: string; text: string }) => {
      const res = await axiosInstance.post("/comments", data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
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
    onSuccess: (data) => {
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
