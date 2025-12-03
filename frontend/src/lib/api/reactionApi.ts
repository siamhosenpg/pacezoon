// lib/api/reactionApi.ts
import axiosInstance from "@/lib/axios";

export const createOrUpdateReaction = async ({
  postId,
  reaction,
}: {
  postId: string;
  reaction: string;
}) => {
  const res = await axiosInstance.post(
    "/reactions",
    { postId, reaction },
    { withCredentials: true }
  );
  return res.data;
};

export const deleteReaction = async (postId: string) => {
  const res = await axiosInstance.delete(`/reactions/${postId}`, {
    withCredentials: true,
  });
  return res.data;
};

export const getReactionsByPost = async (postId: string) => {
  const res = await axiosInstance.get(`/reactions/post/${postId}`);
  return res.data;
};

// 🟡 NEW → Get Reaction Count
export const getReactionCount = async (postId: string) => {
  const res = await axiosInstance.get(`/reactions/count/${postId}`);
  return res.data.count; // শুধু count numeric return করলেই ভালো
};
