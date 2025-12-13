"use client";

import React from "react";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";
import {
  useSavePost,
  useCheckSaved,
  useDeleteSavedItem,
} from "@/hook/save/useSavedItems";
import { useQueryClient } from "@tanstack/react-query";

interface PostCardSaveButtonProps {
  postId: string;
}

const PostCardSaveButton: React.FC<PostCardSaveButtonProps> = ({ postId }) => {
  const queryClient = useQueryClient();

  // Saved status hook
  const { data, isLoading } = useCheckSaved(postId);
  const isSaved = data?.saved || false;

  // Save hook
  const { mutate: savePost } = useSavePost();

  // Delete hook
  const { mutate: deleteSaved } = useDeleteSavedItem();

  /* ---------------------------------------------------
   * Toggle Save/Delete
   * --------------------------------------------------- */
  const handleClick = () => {
    if (isLoading) return;

    const previous = isSaved;

    // Optimistic UI update
    queryClient.setQueryData(["saved-status", postId], { saved: !isSaved });

    if (!isSaved) {
      // SAVE
      savePost(
        { postId, collectionId: "default" },
        {
          onError: () => {
            queryClient.setQueryData(["saved-status", postId], {
              saved: previous,
            });
          },
          onSuccess: () => {
            queryClient.invalidateQueries(["saved-items"]);
          },
        }
      );
    } else {
      // DELETE
      deleteSaved(postId, {
        onError: () => {
          queryClient.setQueryData(["saved-status", postId], {
            saved: previous,
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries(["saved-items"]);
        },
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="transition-transform duration-150 cursor-pointer hover:bg-background-secondary w-8 h-8 flex items-center justify-center rounded-full"
    >
      {isSaved ? (
        <MdBookmark className="text-xl text-accent" />
      ) : (
        <MdBookmarkBorder className="text-xl text-secondary" />
      )}
    </button>
  );
};

export default PostCardSaveButton;
