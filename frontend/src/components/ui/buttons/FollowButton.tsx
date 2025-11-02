"use client";
import React from "react";

const FollowButton = () => {
  const [followed, setFollowed] = React.useState(false);
  const toggleFollow = () => {
    setFollowed(!followed);
  };
  return (
    <button
      onClick={toggleFollow}
      className={`text-sm text-accent font-semibold border-accent border-[1px] py-[3px] px-3 rounded-md ${
        followed ? " text-text-tertiary border-text-tertiary" : "bg-transparent"
      }`}
    >
      {followed ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
