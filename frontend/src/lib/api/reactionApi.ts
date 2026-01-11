// lib/api/reactionApi.ts
import axiosInstance from "@/lib/axios";

// ==================== CREATE REACTION ====================

export const createReaction = async ({
  postId,
  reaction,
}: {
  postId: string;
  reaction: string;
}) => {
  const res = await axiosInstance.post(
    "/reactions/create",
    { postId, reaction },
    { withCredentials: true }
  );
  return res.data;
};

// ==================== UPDATE REACTION ====================

export const updateReaction = async ({
  postId,
  reaction,
}: {
  postId: string;
  reaction: string;
}) => {
  const res = await axiosInstance.put(
    "/reactions/update",
    { postId, reaction },
    { withCredentials: true }
  );
  return res.data;
};

// ==================== DELETE REACTION ====================

export const deleteReaction = async (postId: string) => {
  const res = await axiosInstance.delete(`/reactions/${postId}`, {
    withCredentials: true,
  });
  return res.data;
};

// ==================== GET REACTIONS OF A POST ====================

export const getReactionsByPost = async (postId: string) => {
  const res = await axiosInstance.get(`/reactions/post/${postId}`);
  return res.data;
};

// ==================== GET REACTION COUNT ====================

export const getReactionCount = async (postId: string) => {
  const res = await axiosInstance.get(`/reactions/count/${postId}`);
  return res.data.count; // শুধু count return
};

// ==================== GET TOP REACTIONS OF A POST ====================

export const getTopReactionsByPost = async (postId: string) => {
  const res = await axiosInstance.get(`/reactions/top/${postId}`);
  return res.data.topReactions;
};
