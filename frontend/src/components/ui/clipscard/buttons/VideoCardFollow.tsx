import React from "react";
import { useFollowUser, useFollowing } from "@/hook/useFollow";
import { useAuth } from "@/hook/useAuth";

interface FollowButtonProps {
  targetUserId: string;
}

const VideoCardFollow: React.FC<FollowButtonProps> = ({ targetUserId }) => {
  const { user, isLoading: authLoading } = useAuth();
  const currentUser = user?.user?._id;

  // 🔥 Hooks must always run — no conditions before hooks!
  const { data: followingData, isLoading: followingLoading } = useFollowing(
    currentUser || ""
  );
  const followMutation = useFollowUser();

  // 🔥 নিজের account-এ follow button hide
  if (!currentUser || currentUser === targetUserId) {
    return null;
  }

  // Loading state
  if (authLoading || followingLoading) {
    return (
      <button
        disabled
        className={`block text-sm font-semibold border rounded-md transition-all 
              opacity-50 cursor-not-allowed
            `}
      >
        Loading...
      </button>
    );
  }

  // 🔥 Check if already following
  const isFollowing = followingData?.some(
    (f) => f.followingId?._id === targetUserId
  );

  const handleFollow = () => {
    if (isFollowing || followMutation.isPending) return;
    followMutation.mutate(targetUserId);
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isFollowing || followMutation.isPending}
      className={`text-[13px] font-bold border border-white text-white px-2 py-px rounded ${
        isFollowing ? "hidden" : "block"
      }`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default VideoCardFollow;
