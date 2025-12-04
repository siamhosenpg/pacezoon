// hooks/useFollow.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { AxiosResponse } from "axios";

// ==================== Types ====================

interface FollowResponse {
  message: string;
}
interface FollowingApiResponse {
  following: FollowData[];
}

interface User {
  _id: string;
  username: string;
  name: string;
  profileImage: string;
  bio: string;
}

export interface FollowData {
  _id: string;
  followerId: User;
  followingId: User;
}

// ==================== Follow User ====================

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation<FollowResponse, any, string>({
    mutationFn: async (userId: string) => {
      const res: AxiosResponse<FollowResponse> = await axiosInstance.post(
        `/follows/follow/${userId}`
      );
      return res.data;
    },

    onSuccess: (_, userId) => {
      // Refresh follower/following lists
      queryClient.invalidateQueries({ queryKey: ["followers", userId] });
      queryClient.invalidateQueries({ queryKey: ["following"] });

      // 🔥 Refresh Counts
      queryClient.invalidateQueries({ queryKey: ["followersCount", userId] });
      queryClient.invalidateQueries({ queryKey: ["followingCount"] });
    },
  });
};

// ==================== Unfollow User ====================

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation<FollowResponse, any, string>({
    mutationFn: async (userId: string) => {
      const res: AxiosResponse<FollowResponse> = await axiosInstance.delete(
        `/follows/unfollow/${userId}`
      );
      return res.data;
    },

    onSuccess: (_, userId) => {
      // Refresh lists
      queryClient.invalidateQueries({ queryKey: ["followers", userId] });
      queryClient.invalidateQueries({ queryKey: ["following"] });

      // 🔥 Refresh Counts
      queryClient.invalidateQueries({ queryKey: ["followersCount", userId] });
      queryClient.invalidateQueries({ queryKey: ["followingCount"] });
    },
  });
};

// ==================== Get Followers ====================

export const useFollowers = (userId: string) => {
  return useQuery<FollowData[]>({
    queryKey: ["followers", userId],
    queryFn: async () => {
      const res: AxiosResponse<FollowData[]> = await axiosInstance.get(
        `/follows/followers/${userId}`
      );
      return res.data;
    },
    enabled: !!userId,
  });
};

// ==================== Get Following ====================
export const useFollowing = (userId: string) => {
  return useQuery<FollowData[]>({
    queryKey: ["following", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await axiosInstance.get<FollowingApiResponse>(
        `/follows/following/${userId}`
      );

      // TypeScript-কে explicitly check করতে হবে
      if (Array.isArray(res.data)) {
        return res.data;
      }

      if ("following" in res.data && Array.isArray(res.data.following)) {
        return res.data.following;
      }

      return [];
    },
  });
};

// ==================== Get Followers Count ====================

export const useFollowersCount = (userId: string) => {
  return useQuery<number>({
    queryKey: ["followersCount", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/follows/followers/count/${userId}`);
      return res.data.followersCount;
    },
    enabled: !!userId,
  });
};

// ==================== Get Following Count ====================

export const useFollowingCount = (userId: string) => {
  return useQuery<number>({
    queryKey: ["followingCount", userId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/follows/following/count/${userId}`);
      return res.data.followingCount;
    },
    enabled: !!userId,
  });
};
