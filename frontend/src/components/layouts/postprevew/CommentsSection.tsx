"use client";

import CommentsCard from "@/components/ui/comments/CommentsCard";
import CommentsLoading from "@/components/ui/comments/CommentsLoading";
import { CommentType } from "@/types/commentType";
import React, { useState } from "react";
import { useGetComments } from "@/hook/useComments";

// Correct Props Type
interface CommentsSectionProps {
  postId: string;
  setparentComment: React.Dispatch<React.SetStateAction<CommentType | null>>;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({
  postId,
  setparentComment,
}) => {
  const { data: comments = [], isLoading } = useGetComments(postId);

  if (isLoading)
    return (
      <div>
        <CommentsLoading /> <CommentsLoading />
      </div>
    );

  return (
    <div className="Comments h-full overflow-y-auto ScrollSystem">
      {comments.length === 0 && (
        <p className="p-3 mt-8 text-center text-gray-400 text-sm">
          No comments yet.
        </p>
      )}

      {comments.map((comment: CommentType) => (
        <CommentsCard
          key={comment._id}
          comment={comment}
          setparentComment={setparentComment}
        />
      ))}
    </div>
  );
};

export default CommentsSection;
