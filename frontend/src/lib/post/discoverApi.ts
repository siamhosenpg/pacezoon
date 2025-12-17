import axiosInstance from "@/lib/axios";
import { PostTypes } from "@/types/postType";

export interface DiscoverPostResponse {
  posts: PostTypes[];
  count: number;
  message?: string;
}

export const getDiscoversPostsApi = async (): Promise<DiscoverPostResponse> => {
  const res = await axiosInstance.get<DiscoverPostResponse>("/discovers/media");
  return res.data;
};

export const getDiscoversPostsByUserApi = async (
  userid: string
): Promise<DiscoverPostResponse> => {
  const res = await axiosInstance.get<DiscoverPostResponse>(
    `/discovers/media/${userid}`
  );
  return res.data;
};
