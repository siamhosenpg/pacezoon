"use client";
import FollowButton from "@/components/ui/buttons/FollowButton";
import React from "react";

import { useSuggestedUsers } from "@/hook/useUser";
import { UserType } from "@/types/userType";
import Link from "next/link";

const SuggestAccounts = () => {
  const { data, isLoading, isError } = useSuggestedUsers();

  if (isLoading) return <p>Loading suggestions...</p>;
  if (isError) return <p>Failed to load suggestions</p>;

  return (
    <div className="Suggested  p-3  bg-background rounded-lg">
      <div className="flex items-center text-primary p-3 justify-between border-b border-border">
        <b>Suggested</b>
        <button className="text-sm text-secondary">See all</button>
      </div>
      <ul className="mt-3">
        {data &&
          data.map((user, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between mb-1 hover:bg-background px-3 py-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Link
                    href={`/profile/${user.userid}`}
                    className=" flex items-center justify-center w-10 h-10 rounded-full border border-border overflow-hidden"
                  >
                    <img
                      className=" object-cover w-full h-full rounded-full"
                      src={user.profileImage}
                      alt=""
                    />
                  </Link>
                  <div className="text">
                    <Link
                      href={`/profile/${user.userid}`}
                      className="block w-fit cursor-pointer text-sm font-semibold text-primary"
                    >
                      {user.name}
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
