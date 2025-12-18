import React from "react";

const PeoplesCardSkeleton = () => {
  return (
    <div className="bg-background px-6 py-4 rounded-lg animate-pulse">
      {/* Top section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        <div className="flex items-center w-full gap-3">
          {/* Avatar */}
          <div className="w-12 lg:w-20 h-12 lg:h-20 rounded-full bg-border shrink-0" />

          {/* Name + Bio */}
          <div className="flex-1 space-y-2">
            <div className="h-4 lg:h-5 w-32 bg-border rounded" />
            <div className="h-3 lg:h-4 w-48 bg-border rounded" />
          </div>
        </div>

        {/* Follow button (desktop) */}
        <div className="hidden lg:block">
          <div className="h-10 w-24 bg-border rounded-md" />
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-4 space-y-3">
        {/* Work + Location */}
        <div className="flex flex-row lg:flex-col xl:flex-row gap-3">
          <div className="h-4 w-40 bg-border rounded" />
          <div className="h-4 w-32 bg-border rounded" />
        </div>

        {/* About text */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-border rounded" />
          <div className="h-3 w-5/6 bg-border rounded" />
        </div>

        {/* Follow button (mobile) */}
        <div className="block lg:hidden">
          <div className="h-10 w-24 bg-border rounded-md mt-2" />
        </div>
      </div>
    </div>
  );
};

export default PeoplesCardSkeleton;
