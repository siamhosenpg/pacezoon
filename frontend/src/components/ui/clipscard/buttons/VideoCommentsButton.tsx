import React from "react";
import { useCommentCount } from "@/hook/useComments";

import { FaRegComments } from "react-icons/fa";
import Link from "next/link";

interface CommentButtonProps {
  postId: string;
  postNumber: number;
}

const VideoCommentsButton = ({ postId, postNumber }: CommentButtonProps) => {
  const { data: countComments } = useCommentCount(postId);
  return (
    <Link
      href={`/post/${postNumber}`}
      className="flex flex-col items-center justify-center cursor-pointer w-16 h-14 rounded-xl hover:bg-background-secondary"
    >
      <span className="text-2xl font-black text-shadow-xs">
        <FaRegComments />
      </span>
      {countComments !== undefined && (
        <small className="block smalltext opacity-80 mt-1 text-shadow-xs">
          {countComments}
        </small>
      )}
    </Link>
  );
};

export default VideoCommentsButton;
