"use client";
import FollowButton from "@/components/ui/buttons/FollowButton";
import React from "react";

import { useSuggestedUsers } from "@/hook/useUser";
import { UserType } from "@/types/userType";
import Link from "next/link";
import UserBadge from "@/components/ui/text/UserBadge";

const SuggestAccounts = () => {
  const { data, isLoading, isError } = useSuggestedUsers();

  if (isError) return <p>Failed to load suggestions</p>;

  return (
    <div className="Suggested  p-3  bg-background rounded-lg">
      <div className="flex items-center text-primary p-3 justify-between border-b border-border">
        <b>Suggested</b>
        <button className="text-sm text-secondary">See all</button>
      </div>
      <ul className="mt-3">
        {isLoading && (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-1 px-3 py-2 rounded-lg animate-pulse bg-background/50"
              >
                <div className="flex items-center gap-2">
                  {/* Profile Image Skeleton */}
                  <div className="w-10 h-10 rounded-full bg-background-secondary border border-border" />

                  <div className="flex flex-col gap-1">
                    {/* Name Skeleton */}
                    <div className="w-24 h-4 bg-background-secondary rounded-md" />
                    {/* Username Skeleton */}
                    <div className="w-16 h-3 bg-background-secondary rounded-md" />
                  </div>
                </div>

                {/* Follow Button Skeleton */}
                <div className="w-16 h-8 bg-background-secondary rounded-md" />
              </div>
            ))}
          </div>
        )}
        {data &&
          data.map((user, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between mb-1 hover:bg-background px-3 py-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Link
                    href={`/profile/${user.username}`}
                    className=" flex items-center justify-center w-10 h-10 rounded-full border border-border overflow-hidden"
                  >
                    <img
                      className=" object-cover w-full h-full rounded-full"
                      src={
                        user?.profileImage
                          ? user.profileImage
                          : user?.gender === "female"
                            ? "/images/femaleprofile.jpg"
                            : "/images/profile.jpg" // male or default
                      }
                      alt=""
                    />
                  </Link>
                  <div className="text">
                    <Link
                      href={`/profile/${user.userid}`}
                      className="block w-fit cursor-pointer text-sm font-semibold text-primary"
                    >
                      <span className="flex items-center gap-1">
                        {user.name}
                        <UserBadge badges={user?.badges} />
                      </span>
                    </Link>
                    <span className="block text-sm text-secondary">
                      @{user.username}
                    </span>
                  </div>
                </div>
                <FollowButton variant="" targetUserId={user._id} />
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default SuggestAccounts;
