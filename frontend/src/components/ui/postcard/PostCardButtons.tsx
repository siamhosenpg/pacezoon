"use client";
import React from "react";
import { FaRegComments } from "react-icons/fa"; // Icon for comments (not used here)
import { RiShareForwardLine } from "react-icons/ri"; // Icon for share (not used here)
import { MdBookmarkBorder } from "react-icons/md"; // Icon for bookmark
import { MdBookmark } from "react-icons/md"; // Icon for filled bookmark
import { AiOutlineLike } from "react-icons/ai"; // Icon for like button
import { AiFillLike } from "react-icons/ai"; // Icon for filled like

const PostCardButtons = () => {
  const [liked, setLiked] = React.useState(false);
  const toggleLike = () => {
    setLiked(!liked);
  };
  const [bookmarked, setBookmarked] = React.useState(false);
  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  return (
    <div className="px-4 sm:px-6 flex items-center justify-between mt-4 pb-3 ">
      <div className="left flex items-center justify-start gap-10">
        {/* Likes */}
        <div
          onClick={toggleLike}
          className={`flex gap-1 items-center cursor-pointer ${
            liked ? "text-accent" : "text-primary"
          }`}
        >
          <span className=" block font-semibold text-primary">
            {liked ? (
              <AiFillLike className="text-xl text-accent  " />
            ) : (
              <AiOutlineLike className="text-xl text-primary  " />
            )}
          </span>
          <div className="text-sm text-primary font-semibold">Peace</div>
        </div>
        {/* Comments */}
        <div className="flex gap-1 items-center cursor-pointer">
          <span className="font-semibold text-primary">
            <FaRegComments className="text-xl" />
          </span>
          <div className="text-sm text-primary font-semibold">Comments</div>
        </div>
        {/* Shares */}
        <div className="flex gap-1 items-center cursor-pointer">
          <span className="font-semibold text-primary">
            <RiShareForwardLine className="text-xl" />
          </span>
          {/* Shares count */}
          <div className="text-sm text-primary font-semibold">Share</div>
          {/* Typo: Should be "Share" */}
        </div>
      </div>
      <button onClick={toggleBookmark}>
        {bookmarked ? (
          <MdBookmark className="text-xl text-accent" />
        ) : (
          <MdBookmarkBorder className="text-xl text-secondary" />
        )}
        {/* Bookmark button */}
      </button>
    </div>
  );
};

export default PostCardButtons;
