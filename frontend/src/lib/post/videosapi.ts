import axiosInstance from "../axios";
import { PostTypes } from "@/types/postType";

export interface VideoPostResponse {
  posts: PostTypes[];
  nextCursor: string | null;
  hasMore: boolean;
}

// 🔥 Get all video posts (infinite)
export const getVideoPostsApi = async ({
  pageParam,
}: {
  pageParam?: string | null;
}): Promise<VideoPostResponse> => {
  const { data } = await axiosInstance.get<VideoPostResponse>(
    "/videos/videos",
    {
      params: {
        limit: 6,
        cursor: pageParam,
      },
    }
  );
  return data;
};

// 🔥 Get video posts by user (infinite)
export const getVideoPostsByUserApi = async ({
  pageParam,
  userid,
}: {
  pageParam?: string | null;
  userid: string;
}): Promise<VideoPostResponse> => {
  const { data } = await axiosInstance.get<VideoPostResponse>(
    `/videos/videos/user/${userid}`,
    {
      params: {
        limit: 6,
        cursor: pageParam,
      },
    }
  );
  return data;
};
