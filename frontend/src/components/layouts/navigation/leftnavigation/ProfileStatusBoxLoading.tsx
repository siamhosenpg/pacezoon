"use client";
import React from "react";

const ProfileStatusBoxLoading = () => {
  return (
    <div className="px-8 py-6 bg-background rounded-lg animate-pulse">
      {/* Top Section */}
      <div className="flex gap-3 items-center">
        {/* Profile Image Skeleton */}
        <div className="w-[50px] h-[50px] rounded-full bg-background-secondary"></div>

        {/* Name + Username */}
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 bg-background-secondary rounded"></div>
          <div className="w-24 h-3 bg-background-secondary rounded"></div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="flex items-center w-full justify-between mt-7">
        <div className="text-center">
          <div className="w-10 h-4 bg-background-secondary mx-auto rounded"></div>
          <div className="w-14 h-3 bg-background-secondary mx-auto mt-1 rounded"></div>
        </div>

        <div className="text-center">
          <div className="w-10 h-4 bg-background-secondary mx-auto rounded"></div>
          <div className="w-14 h-3 bg-background-secondary mx-auto mt-1 rounded"></div>
        </div>

        <div className="text-center">
          <div className="w-10 h-4 bg-background-secondary mx-auto rounded"></div>
          <div className="w-14 h-3 bg-background-secondary mx-auto mt-1 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStatusBoxLoading;
