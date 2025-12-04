"use client";
import React from "react";
import { useAuth } from "@/hook/useAuth";
import { HiCheckBadge } from "react-icons/hi2";
import ProfileStatusBoxLoading from "./ProfileStatusBoxLoading";
import Link from "next/link";
import { useFollowersCount, useFollowingCount } from "@/hook/useFollow";

const ProfileStatusBox = () => {
  const { user, isLoading: authLoading } = useAuth();
  const userId = user?.user?._id;

  // 🔹 Hooks always call, even if user undefined
  const { data: followersCount } = useFollowersCount(userId ?? "");
  const { data: followingCount } = useFollowingCount(userId ?? "");

  // 🔹 Loading state
  if (authLoading || !userId) {
    return <ProfileStatusBoxLoading />;
  }

  return (
    <div className="px-8 py-6 bg-background rounded-lg">
      <div className="top flex gap-3 items-center">
        <Link href={`/profile/${user.user.userid}`} className="shrink-0">
          <img
            className="w-[50px] border border-border object-cover h-[50px] rounded-full"
            src={user.user.profileImage}
            alt=""
          />
        </Link>
        <div className="texts">
          <b className="flex gap-1.5 items-center text-lg text-primary">
            {user.user.name} <HiCheckBadge className="text-accent" />
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
          <b className="block font-bold text-primary">49</b>
          <span className="text-sm text-secondary">Post</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStatusBox;
