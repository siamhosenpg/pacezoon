"use client";
import React from "react";
import { FcLike } from "react-icons/fc";
import { AiFillLike } from "react-icons/ai";

import { useCommentCount } from "@/hook/useComments";
import { useReactions } from "@/hook/useReactions";

interface PostCardStatusProps {
  postId: string; // <- TypeScript fix
  Commentsposition: boolean; // <- TypeScript fix
}

const PostCardStatus = ({ postId, Commentsposition }: PostCardStatusProps) => {
  const { reactionCountQuery } = useReactions(postId);
  const countReaction = reactionCountQuery.data || 0;
  const { data: countComments } = useCommentCount(postId);

  return (
    <div
      className={` text-sm flex items-center justify-start gap-3 ${
        Commentsposition
          ? " mt-2 py-1"
          : "px-4 sm:px-6 py-1.5 sm:py-3  border-b border-border"
      } `}
    >
      {/* Reaction Count Section */}
      <div className={`flex items-center gap-1 `}>
        {countReaction > 0 && (
          <div className="flex items-center">
            <FcLike className="text-xl bg-background p-0.5 rounded-full relative z-40" />
            <AiFillLike className="text-xl text-accent bg-background p-0.5 rounded-full ml-[-3px] relative z-30" />
          </div>
        )}

        <span className="block smalltext text-secondary">
          <span className="text-primary font-semibold">{countReaction}</span>{" "}
          Reacts
        </span>
      </div>

      {/* Comments */}
      <div className="flex items-center gap-1">
        <span className="block smalltext text-secondary">
          <span className="text-primary font-semibold">{countComments}</span>{" "}
          Comments
        </span>
      </div>

      {/* Share */}
      <div className="flex items-center gap-1">
        <span className="block smalltext text-secondary">
          <span className="text-primary font-semibold">0</span> Share
        </span>
      </div>
    </div>
  );
};

export default PostCardStatus;
