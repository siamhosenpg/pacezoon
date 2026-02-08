import React from "react";
import { useReactions } from "@/hook/useReactions";
import { ReactionItem } from "@/types/reactionTypes";
import Image from "next/image";
const reactions = [
  { type: "like", icon: "/images/icon/reaction/like.png" },
  { type: "love", icon: "/images/icon/reaction/love.png" },
  {
    type: "angry",
    icon: "/images/icon/reaction/angry.png",
  },
  {
    type: "care",
    icon: "/images/icon/reaction/care.png",
  },
  {
    type: "wow",
    icon: "/images/icon/reaction/wow.png",
  },
  {
    type: "sad",
    icon: "/images/icon/reaction/sad.png",
  },
];

interface HoverReactionsProps {
  postId: string;
  currentUserId: string | undefined;
}

const HoverReactions: React.FC<HoverReactionsProps> = ({
  postId,
  currentUserId,
}) => {
  const { data, createMutation, updateMutation } = useReactions(postId);
  const isMutating = createMutation.isPending || updateMutation.isPending;
  const userReaction = data?.reactions?.find(
    (r: ReactionItem) =>
      String(r?.userId?._id || r?.userId?.id) === String(currentUserId) &&
      String(typeof r?.postId === "string" ? r.postId : r?.postId) ===
        String(postId),
  )?.reaction;

  const handleReaction = (reactionType: string) => {
    if (isMutating) return;

    if (userReaction) {
      // Update existing reaction
      updateMutation.mutate({
        postId,
        reaction: reactionType,
      });
    } else {
      // Create new reaction
      createMutation.mutate({
        postId,
        reaction: reactionType,
      });
    }
  };

  return (
    <div className="flex gap-2 p-2">
      {reactions.map((reaction) => (
        <button
          onClick={() => handleReaction(reaction.type)}
          className=" hover:scale-110 transition-all  cursor-pointer"
          key={reaction.type}
        >
          <Image
            width={60}
            height={60}
            className={`w-7.5 h-7.5 ${
              userReaction === reaction.type ? "scale-125" : "scale-100"
            } transition-transform`}
            src={reaction.icon}
            alt={reaction.type}
          />
        </button>
      ))}
    </div>
  );
};

export default HoverReactions;
