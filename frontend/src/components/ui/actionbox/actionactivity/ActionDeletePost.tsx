"use client";

import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { usePost } from "@/hook/usePost";
import { PostTypes } from "@/types/postType";

interface Props {
  post: PostTypes;
  onClose?: () => void; // optional: popup close করার জন্য
}

const ActionDeletePost: React.FC<Props> = ({ post, onClose }) => {
  const { deletePost, deletePostLoading } = usePost();

  const handleDelete = () => {
    deletePost(
      {
        postid: post._id,
        postUserId: post.userid._id,
      },
      {
        onSuccess: () => {
          console.log("Post deleted successfully");
          if (onClose) onClose(); // menu close
        },
      }
    );
  };

  return (
    <div
      className="flex items-center gap-2 px-6 py-3 hover:bg-background-secondary cursor-pointer rounded-md"
      onClick={handleDelete}
    >
      <div className="text-xl text-red-500">
        <MdDeleteOutline />
      </div>

      <strong className="font-semibold">
        {deletePostLoading ? "Deleting..." : "Delete Post"}
      </strong>
    </div>
  );
};

export default ActionDeletePost;
