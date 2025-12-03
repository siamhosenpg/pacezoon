"use client";

import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsReply } from "react-icons/bs";
import { AiOutlineFire } from "react-icons/ai";
import { CommentType } from "@/types/commentType";
import { useDeleteComment } from "@/hook/useComments";
import { MdDeleteOutline } from "react-icons/md";

interface CommentsCardProps {
  comment: CommentType;
}

const CommentsCard: React.FC<CommentsCardProps> = ({ comment }) => {
  // ❌ ভুল → useGetComments(comment._id)
  // ✔️ সঠিক
  const deleteComment = useDeleteComment();

  const handleDelete = (id: string) => {
    deleteComment.mutate(id);
  };

  return (
    <div className="commentsitems flex items-start gap-2 mt-3 overflow-auto pr-2">
      {/* Profile Image */}
      <div className="image w-10 h-10 rounded-full shrink-0 bg-background-secondary">
        <img
          loading="lazy"
          src={
            comment.commentUserId && typeof comment.commentUserId !== "string"
              ? comment.commentUserId.avatar ||
                comment.commentUserId.profileImage ||
                "/images/profile.jpg"
              : "/images/profile.jpg"
          }
          className="w-full h-full object-cover rounded-full"
          alt="profile"
        />
      </div>

      {/* Comment Body */}
      <div className="texts max-w-[370px] bg-background-secondary px-2 py-2 rounded-xl rounded-tl-none">
        <div className="font-semibold text-sm flex items-center gap-2 justify-between">
          <h4 className="pl-2">
            {typeof comment.commentUserId !== "string"
              ? comment.commentUserId.name
              : "Unknown User"}
          </h4>
          <HiDotsHorizontal className="text-secondary cursor-pointer" />
        </div>

        {/* Comment Text */}
        <p className="block text-secondary rounded-xl text-sm mt-1 px-2">
          {comment.text}
        </p>

        {/* Media */}
        {comment.media?.url?.length > 0 && (
          <div className="mt-2">
            {comment.media.type === "image" &&
              comment.media.url.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className="rounded-lg max-h-60 object-cover max-w-[150px]"
                  alt="comment media"
                />
              ))}
          </div>
        )}
      </div>

      {/* Delete + Reply */}
      <div className="flex items-center mt-3 gap-3">
        <button
          onClick={() => handleDelete(comment._id)}
          className="flex text-secondary"
        >
          <MdDeleteOutline className="text-lg text-red-700" />
        </button>

        <button className="text-sm text-secondary">
          <BsReply className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default CommentsCard;
