"use client";
import React, { useState } from "react";

import Link from "next/link";
import PostCardButtons from "../PostCardButtons";
import ThreeDotIconbutton from "../../buttons/ThreeDotIconbutton";
import { PostTypes } from "@/types/postType";
import PostcardMedia from "../PostcardMedia";
import PostcardVideo from "../PostcardVideo";

import PostCardstatus from "../PostCardstatus";
import DateTime from "../../datetime/DateTime";
import UserBadge from "../../text/UserBadge";
interface PostboxProps {
  post: PostTypes;
}
const SharePostCard: React.FC<PostboxProps> = ({ post }) => {
  const renderPostMedia = () => {
    switch (post.content.parentPost?.content?.type) {
      case "image":
        return (
          <PostcardMedia
            imagedata={post?.content?.parentPost?.content?.media || []}
            postid={post.content.parentPost._id}
          />
        );

      case "video":
        return (
          <PostcardVideo
            videodata={post?.content?.parentPost?.content?.media}
            postid={post.content.parentPost._id}
          />
        );

      case "audio":
        return null;

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
              src={post.userid?.profileImage} // Placeholder profile image
              alt=""
            />
          </Link>
          <div className="text">
            <div className="flex gap-2  items-center">
              <div className="font-semibold  text-primary whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-1">
                <span className=" block">{post.userid?.name}</span>

                <UserBadge badges={post.userid?.badges} />
              </div>
            </div>
            <span className=" smalltext text-text-tertiary flex gap-2 items-center">
              <span className=" capitalize">{post.privacy}</span>{" "}
              <DateTime date={post?.createdAt} />
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
          className={`posttext line-clamp-3 whitespace-pre-wrap text-sm font-medium text-secondary mt-0  lg:mt-3 px-4 sm:px-6 ${
            expanded ? "line-clamp-none" : "line-clamp-3"
          } `}
        >
          {post.content?.caption}
        </p>
      )}

      <div className="px-4 lg:px-6 pt-3">
        <div className=" border-border border py-4  rounded-lg">
          <div className="left px-4 sm:px-6  flex items-center justify-start gap-2 overflow-hidden">
            <Link
              href={`/profile/${post.content.parentPost?.userid.username}`}
              className="w-8 h-8 bg-gray-300 sm:w-8 sm:h-8 border-border border shrink-0  rounded-full overflow-hidden "
            >
              <img
                loading="lazy"
                className=" block w-full  h-full object-cover   "
                src={post.content.parentPost?.userid.profileImage} // Placeholder profile image
                alt=""
              />
            </Link>
            <div className="text">
              <div className="flex gap-2  items-center">
                <div className="font-semibold  text-primary whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-1">
                  <span className=" block">
                    {post.content.parentPost?.userid.name}
                  </span>

                  <UserBadge badges={post.content.parentPost?.userid.badges} />
                </div>
              </div>
            </div>
          </div>
          {/* Post text content */}
          {post.content?.parentPost?.content.caption && (
            <p
              onClick={() => setExpanded(!expanded)}
              className={`posttext line-clamp-3 whitespace-pre-wrap text-sm font-medium text-secondary mt-0 mb-3 lg:mt-3 px-4 sm:px-6 ${
                expanded ? "line-clamp-none" : "line-clamp-3"
              } `}
            >
              {post.content?.parentPost?.content.caption}
            </p>
          )}

          {/* Media Section */}
          <div className="mt-0 lg:mt-3">{renderPostMedia()}</div>
        </div>
      </div>
      {/* Engagement section (likes, comments, shares) */}
      <div className="  ">
        <PostCardstatus Commentsposition={false} postId={post._id} />
        <PostCardButtons com={false} postId={post._id} postNumber={post._id} />
      </div>
    </li>
  );
};

export default SharePostCard;
