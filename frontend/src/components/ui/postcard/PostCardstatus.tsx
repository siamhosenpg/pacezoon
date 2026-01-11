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

const reactionImageMap: Record<string, string> = {
  like: "/images/icon/reaction/like.png",
  love: "/images/icon/reaction/love.png",
  care: "/images/icon/reaction/emoji.png",
  angry: "/images/icon/reaction/angry.png",
  wow: "/images/icon/reaction/wow.png",
  sad: "/images/icon/reaction/sad.png",
};
const PostCardStatus = ({ postId, Commentsposition }: PostCardStatusProps) => {
  const { reactionCountQuery, topReactionsQuery } = useReactions(postId);
  const countReaction = reactionCountQuery.data || 0;
  const { data: countComments } = useCommentCount(postId);

  const topReactions = topReactionsQuery.data || [];

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
        {topReactions.slice(0, 3).map((reaction: any, index: any) => {
          const imgSrc = reactionImageMap[reaction.type];

          if (!imgSrc) return null; // safety

          return (
            <img
              key={index}
              src={imgSrc}
              alt={reaction.type}
              className={`w-5 h-5 rounded-full border-2 border-background -ml-2 relative`}
              style={{ zIndex: 20 - index }} // ✅ z-index fix
            />
          );
        })}

        <span className="block smalltext text-secondary">
          <span className="text-primary font-semibold">{countReaction}</span>{" "}
          <span className="text-text-tertiary">Reacts</span>
        </span>
      </div>

      {/* Comments */}
      <div className="flex items-center gap-1">
        <span className="block smalltext text-secondary">
          <span className="text-primary font-semibold">{countComments}</span>{" "}
          <span className="text-text-tertiary">Comments</span>
        </span>
      </div>

      {/* Share */}
      <div className="flex items-center gap-1">
        <span className="block smalltext text-secondary">
          <span className="text-primary font-semibold">0</span>{" "}
          <span className="text-text-tertiary">Share</span>
        </span>
      </div>
    </div>
  );
};

export default PostCardStatus;
