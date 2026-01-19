import Link from "next/link";
import React from "react";
import { useAuth } from "@/hook/useAuth";

import { MdOutlineAddAPhoto } from "react-icons/md";

const StoryAdd = () => {
  const { user, isLoading, error } = useAuth();
  if (!user) return "No user Login";
  if (error) return <p className="text-red-500">Failed to load feed posts</p>;
  if (isLoading)
    return (
      <div className="animate-pulse">
        <div className="flex flex-col mx-w-[80px] w-17.5 sm:w-20 items-center shrink-0">
          <div className="w-14 h-14 bg-background-secondary rounded-full relative">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full bg-background-tertiary"></div>

            {/* Inner circle */}
            <div className="absolute inset-0.5 rounded-full bg-background-secondary"></div>

            {/* Add icon placeholder */}
            <div className="absolute w-[88%] aspect-square inset-1 rounded-full bg-background-tertiary"></div>
          </div>

          <span className="text-[11px] sm:text-[12px] w-full text-center mt-1 bg-background-secondary h-3 rounded"></span>
        </div>
      </div>
    );
  return (
    <div className="">
      <div className="flex flex-col mx-w-[80px] w-17.5 sm:w-20  items-center  shrink-0 ">
        <Link
          href={`/stories/createstory`}
          className="w-14 h-14 bg-linear-to-r from-[#06af3e] via-[#01b88a] to-[#8bd401] rounded-full overflow-hidden p-0.75"
        >
          <div className=" relative flex items-center justify-center p-0.75 bg-background rounded-full  ">
            <img
              loading="lazy"
              className=" aspect-square w-full h-full block rounded-full bg-background-secondary  object-cover"
              src={
                user?.user?.profileImage
                  ? user?.user?.profileImage
                  : user?.user?.gender === "female"
                    ? "/images/femaleprofile.jpg"
                    : "/images/profile.jpg" // male or default
              }
              alt=""
            />
            <div className=" absolute flex items-center justify-center z-30 w-[88%] aspect-square  bg-accent-transprant text-white rounded-full">
              <MdOutlineAddAPhoto className="text-xl" />
            </div>
          </div>
        </Link>
        <span className=" text-loose block text-[11px] font-medium md:text-[12px]  w-full text-center mt-1 whitespace-nowrap overflow-hidden text-ellipsis ">
          Create Story
        </span>
      </div>
    </div>
  );
};

export default StoryAdd;
