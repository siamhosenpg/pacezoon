"use client";
import React, { useContext, useState } from "react";
// Importing UserContext to access user data
import { BsThreeDotsVertical } from "react-icons/bs"; // Icon for menu options
import { AiOutlineFire } from "react-icons/ai"; // Icon for likes
import { AiFillFire } from "react-icons/ai"; // Another fire icon (not used here)
import { MdBookmarkBorder } from "react-icons/md"; // Icon for bookmark
import { LuSendHorizontal } from "react-icons/lu"; // Icon for send button
import { MdOutlinePublic } from "react-icons/md"; // Icon for public visibility
import { MdOutlineLocationOn } from "react-icons/md"; // Icon for location
import { FaRegComments } from "react-icons/fa"; // Icon for comments (not used here)
import { RiShareForwardLine } from "react-icons/ri"; // Icon for share (not used here)

const Postbox = ({}) => {
  // Accessing post data from PostContext
  // Accessing user data from UserContext
  // Accessing user data from UserContext

  return (
    <li className="bg-background rounded-none sm:rounded-lg   py-2 sm:py-3 pt-4 sm:pt-5 mb-2 sm:mb-4">
      <div className="flex items-center px-4 sm:px-6 justify-between ">
        <div className="left   flex items-center justify-start gap-2 overflow-hidden">
          <div className="w-10 h-10 bg-gray-300 sm:w-12 sm:h-12 border-border border shrink-0  rounded-full overflow-hidden ">
            <img
              loading="lazy"
              className=" block w-full  h-full object-cover   "
              src="/images/profile.jpg" // Placeholder profile image
              alt=""
            />
          </div>
          <div className="text">
            <div className="flex gap-2  items-center">
              <div className="font-semibold block text-primary whitespace-nowrap overflow-hidden text-ellipsis">
                Siam Hossen
              </div>{" "}
              {/* Hardcoded user name */}
              <span className="text-sm flex items-center w-fit text-gray-600">
                <MdOutlineLocationOn className="text-tertiary" />
                <span className="max-w-[130px] text-secondary text-[12px] sm:text-[13px] sm:max-w-fit text-ellipsis whitespace-nowrap overflow-hidden">
                  Dhaka, Bangladesh
                </span>{" "}
                {/* Post location */}
              </span>
            </div>
            <span className="text-[12px] sm:text-[13px] text-tertiary flex gap-2 items-center">
              Just now . <MdOutlinePublic /> {/* Public visibility icon */}
            </span>
          </div>
        </div>
        <button>
          <BsThreeDotsVertical className="text-xl text-secondary" />
          {/* Menu button */}
        </button>
      </div>

      {/* Post text content */}
      <div className="posttext text-sm font-medium text-secondary mt-4 px-4 sm:px-6">
        This is a sample post description. It can be of any length and may
        include various details about the post.
      </div>

      {/* Post media (image) */}
      <div className="media block w-full px-0 sm:px-6 h-auto overflow-hidden">
        <img
          loading="lazy"
          className=" rounded-none sm:rounded-lg mt-2 w-full h-auto min-h-[200px] min-w-[100px] bg-gray-100 max-h-[700px]"
          src="/images/profile.jpg" // Media URL from post data
        />
      </div>

      {/* Engagement section (likes, comments, shares) */}

      <div className="  ">
        <div className="px-4 sm:px-6 py-3 mt-2 text-sm border-b border-border flex items-center justify-start gap-3">
          <div className="text-xl flex items-center gap-1">
            <AiFillFire className=" text-ascent" />
            <span className="block text-[13px] text-secondary">
              <span className="text-primary font-semibold"> 256</span> Hot
            </span>
          </div>
          <div className="text-xl flex items-center gap-1">
            <span className="block text-[13px] text-secondary">
              <span className="text-primary font-semibold"> 64</span> Comments
            </span>
          </div>
          <div className="text-xl flex items-center gap-1">
            <span className="block text-[13px] text-secondary">
              <span className="text-primary font-semibold">32</span> Share
            </span>
          </div>
        </div>
        <div className="px-4 sm:px-6 flex items-center justify-between mt-4 pb-3 ">
          <div className="left flex items-center justify-start gap-10">
            {/* Likes */}
            <div className="flex gap-1 items-center cursor-pointer">
              <AiOutlineFire className="text-xl text-primary sm:text-2xl " />
              <span className="font-semibold text-primary"></span>{" "}
              {/* Like count */}
              <div className="text-sm text-primary font-semibold">Hot</div>
            </div>
            {/* Comments */}
            <div className="flex gap-1 items-center cursor-pointer">
              <span className="font-semibold text-primary">
                <FaRegComments className="text-xl" />
              </span>{" "}
              {/* Comments count */}
              <div className="text-sm text-primary font-semibold">Comments</div>
            </div>
            {/* Shares */}
            <div className="flex gap-1 items-center cursor-pointer">
              <span className="font-semibold text-primary">
                <RiShareForwardLine className="text-xl" />
              </span>{" "}
              {/* Shares count */}
              <div className="text-sm text-primary font-semibold">
                Share
              </div>{" "}
              {/* Typo: Should be "Share" */}
            </div>
          </div>
          <button>
            <MdBookmarkBorder className="text-xl text-secondary" />{" "}
            {/* Bookmark button */}
          </button>
        </div>
      </div>

      <div className=" px-4 sm:px-6 hidden">
        {/* Input for adding a comment */}
        <div className="CommentsInput flex gap-3 mt-2 sm:mt-3 items-center  ">
          <img
            className="w-9 sm:w-10 h-9 sm:h-10 shrink-0 rounded-full"
            src="/profile/2.jpg" // Placeholder profile image
            alt=""
          />
          <input
            type="text"
            className=" bg-background-secondary text-loose rounded-full px-5 py-2 sm:py-2 text-sm w-full outline-none"
            placeholder="What's your mind?" // Placeholder text
          />
          <button className="bg-background-secondary shrink-0  rounded-full w-9 h-9  flex items-center justify-center">
            <LuSendHorizontal className="text-lg text-secondary" />{" "}
            {/* Send button */}
          </button>
        </div>

        {/* Comments section */}

        <div className=" mt-5">
          <b className="text-loose"> Comments</b>
          <div className=" Comments pb-3">
            {/* Looping through comments */}

            <div className=" commentsitems flex items-start gap-2 mt-2 ">
              {/* Commenter profile image */}
              <div className="image w-8 h-8 shink">
                <img
                  loading="lazy"
                  src="" // Placeholder profile image
                  className=" bg-blue-50 w-full h-full rounded-full"
                  alt=""
                />
              </div>
              {/* Comment text */}
              <div className="texts max-w-[80%] bg-background-secondary px-4 py-2 rounded-xl rounded-tl-none">
                <b className="block font-semibold text-sm text-primary">
                  Siam Hossen
                </b>
                <div className="flex items-start gap-2">
                  <span className="block rounded-xl text-sm text-secondary mt-1">
                    This is a sample comment text.
                  </span>
                </div>
              </div>
              {/* Like and reply buttons for comments */}
              <div className="flex items-center mt-2 gap-3">
                <button className=" flex ">
                  <AiOutlineFire className="text-lg text-loose" />{" "}
                  {/* Like button */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Postbox;
