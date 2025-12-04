"use client";
import Link from "next/link";
import React from "react";

import { IoIosAddCircle } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

import { useAuth } from "@/hook/useAuth";
import FollowButton from "@/components/ui/buttons/FollowButton";

interface ProfileTopButtonsProps {
  userId: string; // incoming profile owner userId
}

const ProfileTopButtons: React.FC<ProfileTopButtonsProps> = ({ userId }) => {
  const { user, isLoading } = useAuth();

  // Safe auth user ID
  const authUserId: string | undefined = user?.user?._id;

  if (isLoading) return <div>Loading...</div>;
  if (!authUserId) return null; // prevent crash if user isn't loaded

  const isMyProfile = authUserId === userId;

  return (
    <div className="w-full lg:w-7/12 flex justify-between items-center gap-2">
      {isMyProfile ? (
        <>
          <Link
            href="/post/createpost"
            className="w-5/12 bg-accent rounded-md px-4 py-2 font-semibold 
                       transition duration-200 ease-in-out text-sm text-white 
                       flex items-center justify-center gap-2"
          >
            <IoIosAddCircle className="text-xl text-white" />
            <span className="overflow-hidden whitespace-nowrap text-white text-ellipsis truncate">
              Add Post
            </span>
          </Link>

          <Link
            href="/profile/edit"
            className="w-5/12 bg-red-100 rounded-md px-4 py-2 font-semibold 
                       transition duration-200 ease-in-out text-sm text-red-600 
                       flex items-center justify-center gap-2"
          >
            <MdModeEdit className="text-xl text-red-600" />
            <span className="overflow-hidden whitespace-nowrap text-ellipsis truncate">
              Edit Profile
            </span>
          </Link>
        </>
      ) : (
        <div className="flex items-center mr-3 justify-end w-full">
          <FollowButton targetUserId={userId} variant="lg" />
        </div>
      )}

      <button
        className="w-1/12 flex items-center justify-center bg-background-secondary 
                   rounded-md py-2 transition duration-200 ease-in-out"
      >
        <HiDotsVertical className="text-xl text-loose" />
      </button>
    </div>
  );
};

export default ProfileTopButtons;
