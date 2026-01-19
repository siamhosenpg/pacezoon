"use client";

import React from "react";
import { useFollowersCount, useFollowingCount } from "@/hook/useFollow";
import { useUserPostCount } from "@/hook/usePost";

interface ProfileTopCountStatusProps {
  userId: string;
}

const ProfileTopCountStatus: React.FC<ProfileTopCountStatusProps> = ({
  userId,
}) => {
  // Hooks — always top level
  const { data: followersCount } = useFollowersCount(userId);
  const { data: followingCount } = useFollowingCount(userId);
  const { data: postCount } = useUserPostCount(userId);

  return (
    <div className="w-full lg:w-[50%] text-secondary flex items-center   justify-between lg:justify-start mt-3 lg:mt-0 text-sm gap-4 lg:gap-9 font-semibold">
      <div>
        <span className="text-primary text-base font-bold">
          {followersCount ?? 0}
        </span>{" "}
        Followers
      </div>

      <div>
        <span className="text-primary text-base font-bold">
          {followingCount ?? 0}
        </span>{" "}
        Following
      </div>

      <div>
        <span className="text-primary text-base font-bold">
          {postCount?.count ?? 0}
        </span>{" "}
        Post
      </div>
    </div>
  );
};

export default ProfileTopCountStatus;
