import React from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useReactions } from "@/hook/useReactions";

import { useAuth } from "@/hook/useAuth";
import { ReactionItem } from "@/types/reactionTypes";
interface PostCardStatusProps {
  postId: string; // <- TypeScript fix
}

const VideoLikeButton = ({ postId }: PostCardStatusProps) => {
  const { user, isLoading: authLoading } = useAuth();
  const { data, createMutation, deleteMutation } = useReactions(postId);

  const { reactionCountQuery } = useReactions(postId);
  const countReaction = reactionCountQuery.data || 0;

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
    <button
      onClick={handleToggleLike}
      className="flex flex-col items-center justify-center cursor-pointer w-16 h-14 rounded-xl hover:bg-background-secondary"
    >
      <span
        className={`text-2xl font-black text-shadow-xs ${
          isMutating ? "opacity-50" : ""
        }`}
      >
        {userReaction === "like" ? (
          <AiFillLike className="text-2xl text-shadow-2xs " />
        ) : (
          <AiOutlineLike className="text-2xl text-shadow-2xs " />
        )}
      </span>
      {countReaction !== undefined && (
        <small className="block smalltext opacity-80 mt-1 text-shadow-xs">
          {countReaction}
        </small>
      )}
    </button>
  );
};

export default VideoLikeButton;
