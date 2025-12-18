import React from "react";
import { UserType } from "@/types/userType";
import FollowButton from "../buttons/FollowButton";

import { MdLocationPin } from "react-icons/md";
import { MdWork } from "react-icons/md";
import Link from "next/link";

interface userPorpsdata {
  user: UserType;
}
const PeoplesCard = ({ user }: userPorpsdata) => {
  return (
    <Link
      href={`/profile/${user.userid}`}
      key={user._id}
      className=" bg-background px-6 py-4 rounded-lg "
    >
      <div className=" flex  flex-col lg:flex-row items-start lg:items-center justify-between">
        <div className=" flex   items-center w-full gap-3">
          <div className="w-12 lg:w-20 h-12 lg:h-20 rounded-full border border-border overflow-hidden shrink-0 ">
            <img
              className="w-full h-full object-cover "
              src={user.profileImage}
              alt=""
            />
          </div>
          <div className="text w-full">
            <h3 className="font-bold text-base lg:text-lg ">{user.name}</h3>
            <h4 className="font-bold text-sm lg:text-base ">{user.bio}</h4>
          </div>
        </div>
        <div className="w-fit shrink-0 hidden lg:block">
          <FollowButton targetUserId={user._id} variant="lg" />
        </div>
      </div>
      <div className=" mt-3 lg:mt-4">
        <div className="w-full hidden lg:flex flex-row lg:flex-col xl:flex-row items-center gap-3 justify-start  ">
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
        <p className=" mt-1.5 line-clamp-2 text-[12px] lg:text-[14px] font-semibold text-text-secondary">
          {user.aboutText}
        </p>
        <div className="w-fit shrink-0 block lg:hidden mt-2">
          <FollowButton targetUserId={user._id} variant="lg" />
        </div>
      </div>
    </Link>
  );
};

export default PeoplesCard;
