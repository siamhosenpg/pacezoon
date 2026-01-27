import axiosInstance from "@/lib/axios";
import { PostTypes } from "@/types/postType";

export interface DiscoverPostResponse {
  posts: PostTypes[];
  count: number;
  total: number;
  nextSkip: number | null;
  message?: string;
}

/**
 * Fetch media posts with skip & limit
 */
export const getDiscoversPostsApi = async ({
  skip = 0,
  limit = 8,
}: {
  skip?: number;
  limit?: number;
}): Promise<DiscoverPostResponse> => {
  const res = await axiosInstance.get<DiscoverPostResponse>(
    `/posts/media?skip=${skip}&limit=${limit}`,
  );
  return res.data;
};
export const getDiscoversPostsByUserApi = async (
  userid: string,
): Promise<DiscoverPostResponse> => {
  const res = await axiosInstance.get<DiscoverPostResponse>(
    `/discovers/media/${userid}`,
  );
  return res.data;
};
