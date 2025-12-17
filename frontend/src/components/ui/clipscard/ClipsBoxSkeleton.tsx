import React from "react";

const ClipsBoxSkeleton = () => {
  return (
    <section className="snap-center flex items-center justify-center w-full h-full px-0 md:px-4 animate-pulse">
      <div className="relative flex items-center justify-center w-full sm:w-fit">
        {/* 🎬 Video Skeleton */}
        <div
          className="bg-gray-300 dark:bg-gray-700 
          border-none lg:border border-border 
          rounded-none lg:rounded-xl
          max-h-[90vh] w-full lg:w-[calc(90vh*9/16)] 
          h-[calc(100vh-120px)] lg:h-[90vh]"
        />

        {/* 👉 Right Action Buttons Skeleton */}
        <div className="absolute right-1 md:right-[-120px] bottom-8 z-20 flex flex-col gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-xl bg-gray-300 dark:bg-gray-700"
            />
          ))}
        </div>

        {/* 📝 Caption Skeleton */}
        <div className="absolute left-4 bottom-6 z-20 max-w-[80%] space-y-2">
          {/* profile */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="h-3 w-24 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-5 w-14 rounded bg-gray-300 dark:bg-gray-700" />
          </div>

          {/* location */}
          <div className="h-3 w-32 rounded bg-gray-300 dark:bg-gray-700" />

          {/* caption lines */}
          <div className="h-3 w-64 rounded bg-gray-300 dark:bg-gray-700" />
          <div className="h-3 w-48 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </section>
  );
};

export default ClipsBoxSkeleton;
