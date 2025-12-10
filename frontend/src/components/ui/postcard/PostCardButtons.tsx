"use client";

import React from "react";
import { FaRegComments } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useReactions } from "@/hook/useReactions";
import { useAuth } from "@/hook/useAuth";
import Link from "next/link";
import { ReactionItem } from "@/types/reactionTypes";

import PostCardSavebutton from "./PostCardSavebutton";

interface Props {
  postId: string;
  postNumber: number;
}

const PostCardButtons: React.FC<Props> = ({ postId, postNumber }) => {
  const { user, isLoading: authLoading } = useAuth();
  const { data, createMutation, deleteMutation } = useReactions(postId);

  const [error, setError] = React.useState<string | null>(null);

  const isMutating = createMutation.isPending || deleteMutation.isPending;

  const userReaction = data?.reactions?.find(
    (r: ReactionItem) =>
      r?.userId?._id === user?.user?._id || r?.userId?.id === user?.user?._id
  )?.reaction;

  if (authLoading) {
    return (
      <div className="px-4 sm:px-6 py-2">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user?.user?._id) {
    return (
      <div className="px-4 sm:px-6 py-2">
        <p className="text-sm text-gray-500">Login to react</p>
      </div>
    );
  }

  const handleToggleLike = () => {
    setError(null);

    if (userReaction === "like") {
      deleteMutation.mutate(postId, {
        onError: (err: any) => {
          console.error("Delete reaction error:", err);
          setError(err?.response?.data?.message || "Failed to remove like");
        },
      });
    } else {
      createMutation.mutate(
        { postId, reaction: "like" },
        {
          onError: (err: any) => {
            console.error("Create reaction error:", err);
            setError(err?.response?.data?.message || "Failed to add like");
          },
        }
      );
    }
  };

  return (
    <div className="px-4 sm:px-6 flex flex-col gap-1">
      <div className="flex items-center justify-between mt-2 sm:mt-3 pb-0.5 sm:pb-1">
        <div className="left flex items-center justify-start gap-5 sm:gap-6 lg:gap-10">
          {/* Like Button */}
          <button
            onClick={handleToggleLike}
            disabled={isMutating}
            className={`flex gap-1 items-center transition-opacity cursor-pointer  py-1 ${
              isMutating ? "opacity-50" : ""
            }`}
          >
            {userReaction === "like" ? (
              <AiFillLike className="text-xl text-accent" />
            ) : (
              <AiOutlineLike className="text-xl text-primary" />
            )}
            <span
              className={`text-sm font-semibold ${
                userReaction === "like" ? "text-accent" : "text-primary"
              }`}
            >
              {userReaction === "like" ? "Liked" : "Like"}
            </span>
          </button>

          {/* Comments */}
          <Link
            href={`/post/${postNumber}?index=0#comments`}
            className="flex gap-1 items-center cursor-pointer py-1"
          >
            <FaRegComments className="text-xl text-primary" />
            <span className="text-sm text-primary font-semibold">Comments</span>
          </Link>

          {/* Shares */}
          <div className="flex gap-1 items-center cursor-pointer py-1">
            <RiShareForwardLine className="text-xl text-primary" />
            <span className="text-sm text-primary font-semibold">Share</span>
          </div>
        </div>

        {/* Bookmark Button ✓ integrated */}
        <div className="flex items-center">
          <PostCardSavebutton postId={postId} />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 font-medium mt-1">{error}</p>
      )}
    </div>
  );
};

export default PostCardButtons;
