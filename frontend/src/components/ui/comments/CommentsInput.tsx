"use client";

import React, { useState } from "react";
import { FiCornerDownRight } from "react-icons/fi";
import { useCreateComment } from "@/hook/useComments";
import { useAuth } from "@/hook/useAuth";
import { CommentType } from "@/types/commentType";
import { CgCloseO } from "react-icons/cg";
interface CommentsInputProps {
  postId: string; // <-- Type added
  parentComment?: CommentType | null;
  setparentComment: React.Dispatch<React.SetStateAction<CommentType | null>>;
}
const CommentsInput: React.FC<CommentsInputProps> = ({
  postId,
  parentComment,
  setparentComment,
}) => {
  const { user } = useAuth();
  const [text, setText] = useState<string>(""); // <-- typed
  const createComment = useCreateComment(); // This returns a mutation

  const handleSubmit = () => {
    if (!text.trim()) return;

    createComment.mutate(
      { postId, text, parentCommentId: parentComment?._id }, // <-- Correct shape
      {
        onSuccess: () => {
          setText("");
          setparentComment(null);
        },
      },
    );
  };

  return (
    <div className="shrink-0 bg-background pt-2 border-t border-border">
      {parentComment && (
        <div className="flex items-center gap-1.5 pb-2">
          <button
            onClick={() => setparentComment(null)}
            className="flex items-center justify-center shrink-0 cursor-pointer"
          >
            <CgCloseO className="text-lg" />
          </button>
          <div className="flex items-center gap-1.5 ">
            <img
              className="w-6 h-6 rounded-full overflow-hidden object-cover"
              src={
                parentComment?.commentUserId.profileImage
                  ? parentComment?.commentUserId.profileImage
                  : parentComment?.commentUserId.gender === "female"
                    ? "/images/femaleprofile.jpg"
                    : "/images/profile.jpg" // male or default
              }
              alt=""
            />
            <h5 className="font-semibold">
              {parentComment?.commentUserId.name}
            </h5>
            <p className="line-clamp-1">{parentComment?.text}</p>
          </div>
        </div>
      )}

      {/* Comment input section */}
      <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-background-secondary">
        <div className="w-10 h-10 rounded-full shrink-0 border-border border flex items-center justify-center">
          <img
            src={
              user?.user?.profileImage
                ? user?.user.profileImage
                : user?.user.gender === "female"
                  ? "/images/femaleprofile.jpg"
                  : "/images/profile.jpg" // male or default
            }
            loading="lazy"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <input
          type="text"
          placeholder="Write a comment..."
          className="w-full px-4 py-2 rounded-full bg-background-secondary focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="shrink-0 p-2 rounded-full bg-accent flex items-center justify-center text-white cursor-pointer hover:bg-accent-hover transition-colors"
        >
          <FiCornerDownRight className="text-lg text-secondary" />
        </button>
      </div>
    </div>
  );
};

export default CommentsInput;
