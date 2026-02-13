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
  gender: string;
}

export interface FollowData {
  _id: string;
  followerId: User;
  followingId: User;
}

// 🔥 Mutation Context Types
interface FollowMutationContext {
  previousFollowing?: FollowData[];
}

interface UnfollowMutationContext {
  previousFollowing?: FollowData[];
}

// ==================== Follow User (OPTIMISTIC) ====================

export const useFollowUser = (currentUserId: string) => {
  const queryClient = useQueryClient();

  return useMutation<FollowResponse, Error, string, FollowMutationContext>({
    mutationFn: async (targetUserId: string) => {
      const res: AxiosResponse<FollowResponse> = await axiosInstance.post(
        `/follows/follow/${targetUserId}`,
      );
      return res.data;
    },

    onMutate: async (targetUserId) => {
      await queryClient.cancelQueries({
        queryKey: ["following", currentUserId],
      });

      const previousFollowing = queryClient.getQueryData<FollowData[]>([
        "following",
        currentUserId,
      ]);

      // Optimistic add
      queryClient.setQueryData<FollowData[]>(
        ["following", currentUserId],
        (old = []) => [
          ...old,
          {
            _id: "optimistic-follow",
            followerId: { _id: currentUserId } as User,
            followingId: { _id: targetUserId } as User,
          },
        ],
      );

      // Optimistic counts
      queryClient.setQueryData<number>(
        ["followingCount", currentUserId],
        (old = 0) => old + 1,
      );

      queryClient.setQueryData<number>(
        ["followersCount", targetUserId],
        (old = 0) => old + 1,
      );

      return { previousFollowing };
    },

    onError: (_error, _targetUserId, context) => {
      if (context?.previousFollowing) {
        queryClient.setQueryData(
          ["following", currentUserId],
          context.previousFollowing,
        );
      }
    },

    onSettled: (_data, _error, targetUserId) => {
      queryClient.invalidateQueries({
        queryKey: ["following", currentUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ["followers", targetUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ["followingCount", currentUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ["followersCount", targetUserId],
      });
    },
  });
};

// ==================== Unfollow User (OPTIMISTIC) ====================

export const useUnfollowUser = (currentUserId: string) => {
  const queryClient = useQueryClient();

  return useMutation<FollowResponse, Error, string, UnfollowMutationContext>({
    mutationFn: async (targetUserId: string) => {
      const res: AxiosResponse<FollowResponse> = await axiosInstance.delete(
        `/follows/unfollow/${targetUserId}`,
      );
      return res.data;
    },

    onMutate: async (targetUserId) => {
      await queryClient.cancelQueries({
        queryKey: ["following", currentUserId],
      });

      const previousFollowing = queryClient.getQueryData<FollowData[]>([
        "following",
        currentUserId,
      ]);

      // Optimistic remove
      queryClient.setQueryData<FollowData[]>(
        ["following", currentUserId],
        (old = []) => old.filter((f) => f.followingId?._id !== targetUserId),
      );

      // Optimistic counts
      queryClient.setQueryData<number>(
        ["followingCount", currentUserId],
        (old = 0) => Math.max(old - 1, 0),
      );

      queryClient.setQueryData<number>(
        ["followersCount", targetUserId],
        (old = 0) => Math.max(old - 1, 0),
      );

      return { previousFollowing };
    },

    onError: (_error, _targetUserId, context) => {
      if (context?.previousFollowing) {
        queryClient.setQueryData(
          ["following", currentUserId],
          context.previousFollowing,
        );
      }
    },

    onSettled: (_data, _error, targetUserId) => {
      queryClient.invalidateQueries({
        queryKey: ["following", currentUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ["followers", targetUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ["followingCount", currentUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ["followersCount", targetUserId],
      });
    },
  });
};

// ==================== Get Followers ====================

export const useFollowers = (userId: string) => {
  return useQuery<FollowData[]>({
    queryKey: ["followers", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res: AxiosResponse<FollowData[]> = await axiosInstance.get(
        `/follows/followers/${userId}`,
      );
      return res.data;
    },
  });
};

// ==================== Get Following ====================

export const useFollowing = (userId: string) => {
  return useQuery<FollowData[]>({
    queryKey: ["following", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await axiosInstance.get<FollowingApiResponse>(
        `/follows/following/${userId}`,
      );

      if (Array.isArray(res.data)) return res.data;
      if ("following" in res.data) return res.data.following;

      return [];
    },
  });
};

// ==================== Counts ====================

export const useFollowersCount = (userId: string) => {
  return useQuery<number>({
    queryKey: ["followersCount", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/follows/followers/count/${userId}`);
      return res.data.followersCount;
    },
  });
};

export const useFollowingCount = (userId: string) => {
  return useQuery<number>({
    queryKey: ["followingCount", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/follows/following/count/${userId}`);
      return res.data.followingCount;
    },
  });
};
