"use client";

import React from "react";

import { useFollowing } from "@/hook/useFollow";
import { useFollowingCount } from "@/hook/useFollow";
import FollowButton from "@/components/ui/buttons/FollowButton";

interface ProfileFollowerProps {
  userId: string;
}

const ProfileFollower: React.FC<ProfileFollowerProps> = ({ userId }) => {
  const { data: userData, isLoading } = useFollowing(userId);
  const { data: followingCount } = useFollowingCount(userId);
  if (!userData || !followingCount) {
    return null;
  }

  if (isLoading) {
    return (
      <div className=" bg-background  p-0 md:p-2 rounded-md animate-pulse">
        <div className=" grid  px-6 lg:px-12 py-6 grid-cols-2 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-12 h-12 rounded-full bg-background-secondary" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="w-32 h-4 bg-background-secondary rounded-md" />
                <div className="w-24 h-3 bg-background-secondary rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="  px-6 lg:px-12 py-6 bg-background rounded-lg w-full">
        {/* Friends Section Title */}
        <h2 className="text-lg font-bold text-loose">Following</h2>
        <span className=" block text-sm text-secondary mt-1 items-center gap-2">
          <span className="font-bold">{followingCount}</span> Following
        </span>

        {/* Friends List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  text-sm mt-6">
          {/* Friend Item 1 */}
          {userData.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 hover:bg-hovermenu transition p-3 rounded-md hover:bg-background-secondary"
            >
              <div className=" flex items-center gap-2.5">
                <div className="w-12 h-12  rounded-full overflow-hidden border-border border ">
                  <img
                    src={user.followingId?.profileImage}
                    alt=""
                    className="w-full object-cover h-full rounded-full "
                  />
                </div>
                <div className="">
                  <h4 className="  font-bold text-loose">
                    {user.followingId?.name}
                  </h4>
                  <span className="text-secondary smalltext font-semibold block mt-1">
                    {user.followingId?.bio}
                  </span>
                </div>
              </div>
              <div>
                <FollowButton
                  targetUserId={user.followingId?._id}
                  variant={"sm"}
                />
              </div>
            </div>
          ))}

          {/* Add more friends as needed */}
        </div>
      </div>
    </div>
  );
};

export default ProfileFollower;
