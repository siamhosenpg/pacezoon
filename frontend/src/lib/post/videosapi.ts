import axiosInstance from "../axios";
import { PostTypes } from "@/types/postType";

/* =======================
   Types
======================= */

export interface VideoPostResponse {
  posts: PostTypes[];
  count: number;
  message?: string;
}

/* =======================
   API functions
======================= */

// 🔥 Get all video posts
export const getVideoPostsApi = async (): Promise<VideoPostResponse> => {
  const { data } = await axiosInstance.get<VideoPostResponse>("/videos/videos");
  return data;
};

// 🔥 Get video posts by user
export const getVideoPostsByUserApi = async (
  userid: string
): Promise<VideoPostResponse> => {
  const { data } = await axiosInstance.get<VideoPostResponse>(
    `/videos/videos/user/${userid}`
  );
  return data;
};
