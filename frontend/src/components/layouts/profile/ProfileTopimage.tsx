import React from "react";

import { MdLocationPin } from "react-icons/md";

import { MdWork } from "react-icons/md";

import { UserType } from "@/types/userType";
import Link from "next/link";
import ProfileTopCountStatus from "./ProfileTopCountStatus";
import ProfileTopButtons from "./ProfileTopButtons";

interface ProfileTopimageProps {
  user: UserType;
}

const ProfileTopimage: React.FC<ProfileTopimageProps> = ({ user }) => {
  return (
    <div className="bg-background rounded-none lg:rounded-lg mb-4 overflow-hidden w-full pb-8">
      <div className="profiletopimage relative p-6 overflow-hidden w-full">
        <div className="rounded-lg overflow-hidden">
          <img
            loading="lazy"
            src={user?.coverImage || "/images/profile.jpg"}
            alt=""
            className="aspect-7/2 object-cover bg-background-tertiary w-full"
          />
        </div>
      </div>

      <div className="profiletopimagedescrition relative  flex flex-col lg:flex-row items-start lg:items-center justify-start gap-4 px-6 lg:px-10  py-2 mt-[-60px]  rounded-lg">
        <div className="pfimage w-[110px] lg:w-[140px] shrink-0 h-[110px] lg:h-[140px] rounded-full overflow-hidden p-[5px] bg-background ">
          <img
            loading="lazy"
            src={user?.profileImage}
            alt=""
            className="w-full object-cover h-full rounded-full border-border border"
          />
        </div>
        <div className=" w-full pfdescription mt-0 lg:mt-6 flex flex-col lg:flex-row items-start lg:items-center gap-2 justify-between">
          <div className="w-full lg:w-5/12">
            <h1 className="text-xl font-bold text-primary flex items-center gap-1">
              {user?.name || "Unknown User"}
              <div className="status w-2 h-2 mt-1 bg-green-600 rounded-full  border-background border"></div>
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
