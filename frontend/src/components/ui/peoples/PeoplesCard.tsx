import React from "react";
import { UserType } from "@/types/userType";
import FollowButton from "../buttons/FollowButton";
import Link from "next/link";
import UserBadge from "../text/UserBadge";

interface userPorpsdata {
  user: UserType;
}
const PeoplesCard = ({ user }: userPorpsdata) => {
  return (
    <div key={user._id} className=" bg-background px-6 py-4 rounded-lg ">
      <div className=" flex  items-center justify-between relative">
        <Link
          href={`/profile/${user.username}`}
          className=" flex   items-center w-7/10  gap-3"
        >
          <div className="w-12 lg:w-20 h-12 lg:h-20 rounded-full border border-border overflow-hidden shrink-0 ">
            <img
              className="w-full h-full object-cover "
              src={user.profileImage}
              alt=""
            />
          </div>
          <div className="text  w-full">
            <h3 className="font-bold text-base lg:text-lg  flex items-center gap-1">
              {user.name} <UserBadge badges={user.badges} />
            </h3>
            <h4 className="font-bold text-[12px] lg:text-sm  w-11/12  text-text-tertiary text-ellipsis whitespace-nowrap overflow-hidden ">
              {user.bio}
            </h4>
          </div>
        </Link>
        <div className="w-fit absolute shrink-0 block  right-0 z-30">
          <FollowButton targetUserId={user._id} variant="sm" />
        </div>
      </div>
    </div>
  );
};

export default PeoplesCard;
