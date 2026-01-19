"use client";
import React from "react";
import { useAuth } from "@/hook/useAuth";
import ProfileStatusBoxLoading from "./ProfileStatusBoxLoading";
import Link from "next/link";
import { useFollowersCount, useFollowingCount } from "@/hook/useFollow";
import UserBadge from "@/components/ui/text/UserBadge";
import { useUserPostCount } from "@/hook/usePost";

const ProfileStatusBox = () => {
  const { user, isLoading: authLoading } = useAuth();
  const userId = user?.user?._id;

  // 🔹 Hooks always call, even if user undefined
  const { data: followersCount } = useFollowersCount(userId ?? "");
  const { data: followingCount } = useFollowingCount(userId ?? "");

  const { data: postCount } = useUserPostCount(userId ?? "");

  // 🔹 Loading state
  if (authLoading || !userId) {
    return <ProfileStatusBoxLoading />;
  }

  return (
    <div className="px-8 py-6 bg-background rounded-lg">
      <div className="top flex gap-3 items-center">
        <Link href={`/profile/${user.user.username}`} className="shrink-0">
          <img
            className="w-[50px] border border-border object-cover h-[50px] rounded-full"
            src={
              user.user?.profileImage
                ? user.user?.profileImage
                : user.user?.gender === "female"
                  ? "/images/femaleprofile.jpg"
                  : "/images/profile.jpg" // male or default
            }
            alt=""
          />
        </Link>
        <div className="texts">
          <b className="flex gap-1.5 items-center text-lg text-primary">
            {user.user.name} <UserBadge badges={user.user.badges} />
          </b>
          <span className="text-sm block text-secondary">
            @{user.user.username}
          </span>
        </div>
      </div>

      <div className="flex items-center w-full justify-between mt-7 font-medium">
        <div className="text-center">
          <p className="block font-bold text-primary">{followersCount ?? 0}</p>
          <span className="text-sm text-secondary">Follower</span>
        </div>
        <div className="text-center">
          <b className="block font-bold text-primary">{followingCount ?? 0}</b>
          <span className="text-sm text-secondary">Following</span>
        </div>
        <div className="text-center">
          <b className="block font-bold text-primary">
            {postCount?.count ?? 0}
          </b>
          <span className="text-sm text-secondary">Post</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStatusBox;
