"use client";
import Link from "next/link";
import React, { useState } from "react";

import CommentsInput from "@/components/ui/comments/CommentsInput";

import CommentsSection from "@/components/layouts/postprevew/CommentsSection";
import PostCardStatus from "@/components/ui/postcard/PostCardstatus";
import PostCardButtons from "@/components/ui/postcard/PostCardButtons";
import DateTime from "@/components/ui/datetime/DateTime";
import ThreeDotIconButton from "@/components/ui/buttons/ThreeDotIconbutton";
import UserBadge from "@/components/ui/text/UserBadge";
import { PostTypes } from "@/types/postType";
import { CommentType } from "@/types/commentType";

interface PostPorps {
  post: PostTypes;
}

const PostPrevewRight: React.FC<PostPorps> = ({ post }) => {
  const [parentComment, setparentComment] = useState<CommentType | null>(null);
  return (
    <div className="w-full md:w-4/12 hidden lg:block">
      <div className="p-4 h-[calc(100vh-110px)] bg-background rounded-lg flex flex-col justify-between">
        {/* User Info */}
        <div className="shrink-0 ">
          <div className="Profile flex items-center justify-between bg-background-secondary gap-2 px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <Link
                href={`/profile/${post.userid.username}`}
                className="shrink-0 w-12 h-12 rounded-full border-border border flex items-center justify-center overflow-hidden"
              >
                <img
                  src={
                    post.userid.profileImage
                      ? post.userid.profileImage
                      : post.userid.gender === "female"
                        ? "/images/femaleprofile.jpg"
                        : "/images/profile.jpg" // male or default
                  }
                  loading="lazy"
                  alt=""
                  className="w-full h-full object-cover rounded-full overflow-hidden"
                />
              </Link>

              <div>
                <div className="font-semibold text-primary flex items-center gap-1">
                  {post.userid.name}
                  <UserBadge badges={post.userid.badges} />
                </div>
                <div className="smalltext text-secondary line-clamp-1 flex items-center gap-2 w-full">
                  <span className="block capitalize">{post.privacy}</span>
                  <DateTime date={post.createdAt} />
                </div>
              </div>
            </div>

            <ThreeDotIconButton post={post} />
          </div>

          {/* Caption */}
          <p className="text-sm font-medium mt-4 px-2 text-secondary line-clamp-3">
            {post.content.caption}
          </p>

          <PostCardStatus Commentsposition={true} postId={post._id} />
          <div className="border-t border-border">
            <PostCardButtons
              com={true}
              postId={post._id}
              postNumber={post._id}
              shareId={post._id}
            />
          </div>
          {post.content.parentPost?._id}
        </div>

        {/* Comments Section */}
        <div className="h-full flex flex-col overflow-hidden">
          <b className="block shrink-0 py-2 border-b border-border text-loose">
            Comments
          </b>

          <CommentsSection
            postId={post._id}
            setparentComment={setparentComment}
          />
        </div>

        {/* Input Box */}
        <CommentsInput
          postId={post._id}
          parentComment={parentComment}
          setparentComment={setparentComment}
        />
      </div>
    </div>
  );
};

export default PostPrevewRight;
