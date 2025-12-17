import React from "react";
import { MdBookmark } from "react-icons/md";
import { LuBookmark } from "react-icons/lu";
import {
  useSavePost,
  useCheckSaved,
  useDeleteSavedItem,
} from "@/hook/save/useSavedItems";
import { useQueryClient } from "@tanstack/react-query";
interface PostCardSaveButtonProps {
  postId: string;
}

const VideoSaveButton: React.FC<PostCardSaveButtonProps> = ({ postId }) => {
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
      className="flex flex-col items-center justify-center cursor-pointer w-16 h-14 rounded-xl hover:bg-background-secondary"
    >
      <span className="text-2xl font-black text-shadow-xs">
        {isSaved ? (
          <MdBookmark className="text-2xl font-black text-shadow-xs " />
        ) : (
          <LuBookmark className="text-2xl font-black text-shadow-xs  " />
        )}
      </span>

      <small className="block smalltext opacity-80 mt-1 text-shadow-xs">
        Save
      </small>
    </button>
  );
};

export default VideoSaveButton;
