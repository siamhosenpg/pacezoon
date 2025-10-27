import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsReply } from "react-icons/bs";
import { AiOutlineFire } from "react-icons/ai"; // Icon for likes
const CommentsCard = () => {
  return (
    <div className=" commentsitems flex items-start gap-2 mt-3 overflow-auto  pr-2 ">
      {/* Commenter profile image */}
      <div className="image w-10 h-10 rounded-full shrink-0 bg-background-secondary">
        <img
          loading="lazy"
          src="/images/profile.jpg" // Placeholder profile image
          className=" bg-blue-50 w-full h-full object-cover rounded-full"
          alt=""
        />
      </div>
      {/* Comment text */}
      <div className="texts max-w-[370px] text-loose bg-background-secondary px-2 py-2 rounded-xl rounded-tl-none">
        <div className="font-semibold text-sm flex items-center gap-2 justify-between">
          <h4 className="pl-2">Siam Hossen</h4> {/* Hardcoded commenter name */}
          <HiDotsHorizontal className="text-secondary" />
        </div>
        <div className="flex items-start gap-2">
          <p className="block text-secondary rounded-xl text-sm mt-1 px-2">
            You are so beautiful girl. {/* Comment text */}
          </p>
        </div>
      </div>
      {/* Like and reply buttons for comments */}
      <div className="flex items-center mt-3 gap-3">
        <button className=" flex text-secondary">
          <AiOutlineFire className="text-lg" /> {/* Like button */}
        </button>
        <button className="text-sm text-secondary ">
          <BsReply className="text-lg" /> {/* Reply button */}
        </button>
      </div>
    </div>
  );
};

export default CommentsCard;
