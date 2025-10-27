import React from "react";

const PostcardLoading = () => {
  return (
    <div className="bg-background rounded-none sm:rounded-lg mb-2 sm:mb-4">
      <li className=" animate-pulse rounded-none sm:rounded-lg list-none py-2 sm:py-3 pt-4 sm:pt-5  ">
        {/* Header */}
        <div className="flex items-center px-4 sm:px-6 justify-between ">
          <div className="left flex items-center justify-start gap-2 overflow-hidden">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-background-tertiary  rounded-full" />
            <div className="flex flex-col gap-2">
              <div className="h-3 w-24 bg-background-tertiary  rounded" />
              <div className="h-2 w-32 bg-background-tertiary rounded" />
            </div>
          </div>
        </div>

        {/* Post text */}
        <div className="mt-4 px-4 sm:px-6 space-y-2 ">
          <div className="h-3 bg-background-tertiary   rounded w-5/6" />
          <div className="h-3 bg-background-tertiary   rounded w-4/6" />
          <div className="h-3 bg-background-tertiary   rounded w-3/6" />
        </div>

        {/* Image skeleton */}
        <div className="mt-4 px-0 sm:px-6 ">
          <div className="w-full h-60 bg-background-tertiary  rounded-none sm:rounded-lg" />
        </div>

        {/* Engagement counts */}
        <div className="px-4 sm:px-6 py-3 flex gap-4 mt-4 ">
          <div className="h-3 w-20 bg-background-tertiary  rounded" />
          <div className="h-3 w-20 bg-background-tertiary  rounded" />
          <div className="h-3 w-20 bg-background-tertiary  rounded" />
        </div>
      </li>
    </div>
  );
};

export default PostcardLoading;
