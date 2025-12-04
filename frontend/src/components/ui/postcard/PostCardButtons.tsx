"use client";

import React from "react";
import { FaRegComments } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useReactions } from "@/hook/useReactions";
import { useAuth } from "@/hook/useAuth";
import Link from "next/link";

import { ReactionItem } from "@/types/reactionTypes";

interface Props {
  postId: string;
  postNumber: number;
}

const PostCardButtons: React.FC<Props> = ({ postId, postNumber }) => {
  const { user, isLoading: authLoading } = useAuth();
  const { data, createMutation, deleteMutation } = useReactions(postId);

  const [bookmarked, setBookmarked] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const toggleBookmark = () => setBookmarked((prev) => !prev);

  const isMutating = createMutation.isPending || deleteMutation.isPending;

  // ✅ Check if user has already liked
  const userReaction = data?.reactions?.find(
    (r: ReactionItem) =>
      r?.userId?._id === user?.user._id || r?.userId?.id === user?.user._id
  )?.reaction;

  // ✅ Loading / User check
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
      // Remove like
      deleteMutation.mutate(postId, {
        onError: (err: any) => {
          console.error("Delete reaction error:", err);
          setError(err?.response?.data?.message || "Failed to remove like");
        },
      });
    } else {
      // Add like
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
      <div className="flex items-center justify-between mt-4 pb-3">
        <div className="left flex items-center justify-start gap-10">
          {/* Like / Remove Like */}
          <button
            onClick={handleToggleLike}
            disabled={isMutating}
            className={`flex gap-1 items-center transition-opacity ${
              isMutating ? "opacity-50 cursor-not-allowed" : ""
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
            className="flex gap-1 items-center cursor-pointer"
          >
            <FaRegComments className="text-xl text-primary" />
            <span className="text-sm text-primary font-semibold">Comments</span>
          </Link>

          {/* Shares */}
          <div className="flex gap-1 items-center cursor-pointer">
            <RiShareForwardLine className="text-xl text-primary" />
            <span className="text-sm text-primary font-semibold">Share</span>
          </div>
        </div>

        {/* Bookmark */}
        <button onClick={toggleBookmark}>
          {bookmarked ? (
            <MdBookmark className="text-xl text-accent" />
          ) : (
            <MdBookmarkBorder className="text-xl text-secondary" />
          )}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 font-medium mt-1">{error}</p>
      )}
    </div>
  );
};

export default PostCardButtons;
