import React from "react";
import { FcLike } from "react-icons/fc";
import { AiFillLike } from "react-icons/ai";

import { getReactionsByPost } from "@/lib/post/reaction";

interface PostCardStatusProps {
  postid: string; // <- TypeScript fix
}

const PostCardStatus = async ({ postid }: PostCardStatusProps) => {
  const reactionData = await getReactionsByPost(postid);

  const count: number = reactionData?.count ?? 0; // fallback

  return (
    <div className="px-4 sm:px-6 py-3 text-sm border-b border-border flex items-center justify-start gap-3">
      {/* Reaction Count Section */}
      <div
        className={`flex items-center gap-1 ${count === 0 ? "hidden" : "flex"}`}
      >
        <div className="flex items-center">
          <FcLike className="text-xl bg-background p-[2px] rounded-full relative z-40" />
          <AiFillLike className="text-xl text-accent bg-background p-[2px] rounded-full ml-[-3px] relative z-30" />
        </div>

        <span className="block smalltext text-secondary">
          <span className="text-primary font-semibold">{count}</span> Reacts
        </span>
      </div>

      {/* Comments */}
      <div className="flex items-center gap-1">
        <span className="block smalltext text-secondary">
          <span className="text-primary font-semibold">64</span> Comments
        </span>
      </div>

      {/* Share */}
      <div className="flex items-center gap-1">
        <span className="block smalltext text-secondary">
          <span className="text-primary font-semibold">32</span> Share
        </span>
      </div>
    </div>
  );
};

export default PostCardStatus;
