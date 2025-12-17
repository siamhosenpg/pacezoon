"use client";

import React, { useState } from "react";
import { FiCornerDownRight } from "react-icons/fi";
import { useCreateComment } from "@/hook/useComments";
import { useAuth } from "@/hook/useAuth";

interface CommentsInputProps {
  postId: string; // <-- Type added
}
const CommentsInput: React.FC<CommentsInputProps> = ({ postId }) => {
  const { user } = useAuth();
  const [text, setText] = useState<string>(""); // <-- typed
  const createComment = useCreateComment(); // This returns a mutation

  const handleSubmit = () => {
    if (!text.trim()) return;

    createComment.mutate(
      { postId, text }, // <-- Correct shape
      {
        onSuccess: () => {
          setText("");
        },
      }
    );
  };

  return (
    <div className="shrink-0 bg-background pt-2">
      {/* Comment input section */}
      <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-background-secondary">
        <div className="w-10 h-10 rounded-full shrink-0 border-border border flex items-center justify-center">
          <img
            src={user?.user?.profileImage || "/images/profile.jpg"}
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
