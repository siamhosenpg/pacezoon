"use client";
import React, { useState } from "react";
// Importing UserContext to access user data
import { AiOutlineLike } from "react-icons/ai"; // Icon for like button
import { LuSendHorizontal } from "react-icons/lu"; // Icon for send button
import { MdOutlineLocationOn } from "react-icons/md"; // Icon for location

import Link from "next/link";
import PostCardButtons from "./PostCardButtons";
import ThreeDotIconbutton from "../buttons/ThreeDotIconbutton";
import { PostTypes } from "@/types/postType";
import PostcardMedia from "./PostcardMedia";
import PostcardVideo from "./PostcardVideo";

import PostCardstatus from "./PostCardstatus";
import DateTime from "../datetime/DateTime";
import UserBadge from "../text/UserBadge";
import PostMediaAudio from "./audio/PostMediaAudio";

interface PostboxProps {
  post: PostTypes;
}

const Postbox: React.FC<PostboxProps> = ({ post }) => {
  // Accessing post data from PostContext
  // Accessing user data from UserContext

  const renderPostMedia = () => {
    switch (post.content.type) {
      case "image":
        return (
          <PostcardMedia imagedata={post.content.media} postid={post._id} />
        );

      case "video":
        return (
          <PostcardVideo videodata={post.content.media} postid={post._id} />
        );

      case "audio":
        return (
          <div className="px-4 lg:px-6 max-w-130">
            <PostMediaAudio audio={post.content.media} />
          </div>
        );

      case "text":
        return null;

      default:
        return null;
    }
  };

  const [expanded, setExpanded] = useState(false);

  return (
    <li
      key={post._id}
      className="bg-background rounded-none sm:rounded-lg list-none  py-2 sm:py-3 pt-4 sm:pt-5 mb-2 sm:mb-4"
    >
      <div className="flex items-center px-4 pb-3 lg:pb-0 sm:px-6 justify-between  ">
        <div className="left   flex items-center justify-start gap-2 overflow-hidden">
          <Link
            href={`/profile/${post.userid?.username}`}
            className="w-10 h-10 bg-gray-300 sm:w-12 sm:h-12 border-border border shrink-0  rounded-full overflow-hidden "
          >
            <img
              loading="lazy"
              className=" block w-full  h-full object-cover   "
              src={
                post.userid?.profileImage
                  ? post.userid?.profileImage
                  : post.userid?.gender === "female"
                    ? "/images/femaleprofile.jpg"
                    : "/images/profile.jpg" // male or default
              } // Placeholder profile image
              alt=""
            />
          </Link>
          <div className="text">
            <div className="flex gap-2  items-center">
              <div className="font-semibold  text-primary whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-1">
                <span className=" block">{post.userid?.name}</span>

                <UserBadge badges={post.userid?.badges} />
              </div>{" "}
              {/* Hardcoded user name */}
              {post.content?.location && (
                <span className="text-sm flex items-center w-fit text-gray-600">
                  <MdOutlineLocationOn className="text-tertiary" />
                  <span className="max-w-32.5 text-text-secondary font-medium text-[12px] sm:text-[13px] sm:max-w-fit text-ellipsis whitespace-nowrap overflow-hidden">
                    {post.content?.location}
                  </span>{" "}
                  {/* Post location */}
                </span>
              )}
            </div>
            <span className=" smalltext text-text-tertiary flex gap-2 items-center">
              <span className=" capitalize">{post.privacy}</span>{" "}
              <DateTime date={post.createdAt} />
              {/* Public visibility icon */}
            </span>
          </div>
        </div>
        <ThreeDotIconbutton post={post} />
      </div>

      {/* Post text content */}
      {post.content?.caption && (
        <p
          onClick={() => setExpanded(!expanded)}
          className={`posttext line-clamp-3 whitespace-pre-wrap text-sm font-medium text-secondary mt-0 mb-3 lg:mt-3 px-4 sm:px-6 ${
            expanded ? "line-clamp-none" : "line-clamp-3"
          } `}
        >
          {post.content?.caption}
        </p>
      )}

      {/* Media Section */}
      <div className="mt-0 lg:mt-3">{renderPostMedia()}</div>

      {/* Engagement section (likes, comments, shares) */}

      <div className="  ">
        <PostCardstatus Commentsposition={false} postId={post._id} />
        <PostCardButtons
          com={false}
          postId={post._id}
          postNumber={post._id}
          shareId={post._id}
        />
      </div>
    </li>
  );
};

export default Postbox;
