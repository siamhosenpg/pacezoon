"use client";
import React, { useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { UserType } from "@/types/userType";

import ProfileTopCountStatus from "./ProfileTopCountStatus";
import ProfileTopButtons from "./ProfileTopButtons";

import { TbPhotoEdit } from "react-icons/tb";

import EditProfileImages from "../updateprofile/EditProfileImages";
import { useAuth } from "@/hook/useAuth";
import UserBadge from "@/components/ui/text/UserBadge";

interface ProfileTopimageProps {
  user: UserType;
}

const ProfileTopimage: React.FC<ProfileTopimageProps> = ({ user }) => {
  const { user: authuser, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const authUserId: string | undefined = authuser?.user?._id;
  if (isLoading) return <div>Loading...</div>;
  if (!authUserId) return null; // prevent crash if user isn't loaded

  const isMyProfile = authUserId === user._id;
  return (
    <div className="bg-background rounded-none lg:rounded-lg mb-4 overflow-hidden w-full pb-8">
      <div className="profiletopimage relative p-2 lg:p-6 overflow-hidden w-full">
        <div className="rounded-lg overflow-hidden">
          <img
            loading="lazy"
            src={user?.coverImage || "/images/profile.jpg"}
            alt=""
            className="aspect-7/2 object-cover bg-background-tertiary w-full"
          />
        </div>
      </div>

      <div className="profiletopimagedescrition relative z-30  flex flex-col lg:flex-row items-start lg:items-center justify-start gap-4 px-6 lg:px-10  py-2 mt-[-60px]  rounded-lg">
        <div className="pfimage relative  w-[110px] lg:w-[140px] shrink-0 h-[110px] lg:h-[140px] rounded-full  p-[5px] bg-background ">
          <img
            loading="lazy"
            src={user?.profileImage}
            alt=""
            className="w-full object-cover h-full rounded-full border-border border"
          />
          {isMyProfile && (
            <div
              onClick={() => setOpen(true)}
              className="  absolute right-2 bottom-2 border-border border cursor-pointer flex items-center justify-center z-30 w-8 h-8 bg-white rounded-full "
            >
              <TbPhotoEdit className="text-lg " />
            </div>
          )}

          {open && <EditProfileImages onClose={() => setOpen(false)} />}
        </div>
        <div className=" w-full pfdescription mt-0 lg:mt-6 flex flex-col lg:flex-row items-start lg:items-center gap-2 justify-between">
          <div className="w-full lg:w-5/12">
            <h1 className="text-xl font-bold text-primary flex items-center gap-1">
              {user?.name || "Unknown User"}
              <UserBadge badges={user.badges} />
            </h1>
            <p className="text-sm text-loose">
              @{user?.username || "Unknown Username"}
            </p>
          </div>
          <ProfileTopButtons userId={user._id} />
        </div>
      </div>
      <div className="px-6 lg:px-12 flex flex-col   gap-3  ">
        <ProfileTopCountStatus userId={user._id} />
        <div className="w-full    flex flex-row lg:flex-col xl:flex-row items-center gap-3 justify-start  ">
          <div className="  text-secondary   font-semibold">
            {user.work ? (
              <div className="flex justify-start lg:justify-end w-full items-center gap-1 ">
                <MdWork className="text-lg shrink-0" />
                <span className=" block overflow-hidden whitespace-nowrap text-ellipsis truncate text-sm">
                  {user.work[0]}
                </span>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="  text-secondary flex font-semibold text-sm gap-1 items-center justify-end">
            <MdLocationPin className="text-lg" />
            <span className=" block overflow-hidden whitespace-nowrap text-ellipsis truncate text-sm">
              {user?.location || "Unknown"}
            </span>
          </div>
        </div>
      </div>
      <div className="profilebio mt-2 px-6 lg:px-12 ">
        <h3 className=" text-base font-bold mt-6 text-loose ">
          {user?.bio || "Blazora User"}
        </h3>
        <p className=" text-sm text-secondary mt-2">{user?.aboutText || ""}</p>
      </div>
    </div>
  );
};

export default ProfileTopimage;
