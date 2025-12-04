"use client";
import React from "react";
import { useFollowUser, useFollowing } from "@/hook/useFollow";
import { useAuth } from "@/hook/useAuth";

interface FollowButtonProps {
  targetUserId: string;
  variant: "lg" | "sm";
}

const FollowButton: React.FC<FollowButtonProps> = ({
  targetUserId,
  variant,
}) => {
  const { user, isLoading: authLoading } = useAuth();
  const currentUser = user?.user?._id;

  // 🔥 নিজেকে follow করা যাবে না → button hide হবে
  if (!currentUser || currentUser === targetUserId) return null;

  // 🔹 Always call hook, even if data not ready
  const { data: followingData, isLoading: followingLoading } =
    useFollowing(currentUser);
  const followMutation = useFollowUser();

  // Loading state
  if (authLoading || followingLoading) {
    return (
      <button
        disabled
        className={`block text-sm font-semibold border rounded-md transition-all 
          ${variant === "lg" ? "py-1.5 px-8" : "py-[3px] px-3"}
          opacity-50 cursor-not-allowed
        `}
      >
        Loading...
      </button>
    );
  }

  // 🔹 Check if current user is following target user
  const isFollowing = followingData?.some(
    (f) => f.followingId?._id === targetUserId
  );

  const handleFollow = () => {
    if (isFollowing || followMutation.isLoading) return; // Prevent duplicate
    followMutation.mutate(targetUserId);
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isFollowing || followMutation.isLoading}
      className={`block text-sm font-semibold border rounded-md transition-all 
        ${variant === "lg" ? "py-1.5 px-8" : "py-[3px] px-3"}
        ${
          isFollowing
            ? "opacity-50 border-text-tertiary text-text-tertiary cursor-default"
            : "border-accent text-accent hover:opacity-80"
        }
      `}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
