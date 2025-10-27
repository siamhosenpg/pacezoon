import React from "react";

const CommentsLoading = () => {
  return (
    <div className="commentsitems flex items-start gap-2 mt-3 overflow-auto pr-2 animate-pulse">
      {/* Profile image skeleton */}
      <div className="image w-10 h-10 rounded-full shrink-0 bg-background-tertiary" />

      {/* Comment text skeleton */}
      <div className="texts h-13 max-w-[220px] bg-background-tertiary px-2 py-2 rounded-xl rounded-tl-none flex-1"></div>

      {/* Buttons skeleton */}
    </div>
  );
};

export default CommentsLoading;
