"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  savePost,
  getSavedItems,
  deleteSavedItem,
  checkIfPostSaved,
} from "@/lib/save/savedItems";

// Get Saved Items of a collection
export const useSavedItems = (collectionId) => {
  return useQuery({
    queryKey: ["saved-items", collectionId],
    queryFn: () => getSavedItems(collectionId),
    enabled: !!collectionId,
  });
};

// Save Post Hook
export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, collectionId }) => savePost(postId, collectionId),

    onSuccess: (_, { collectionId }) => {
      queryClient.invalidateQueries(["saved-items", collectionId]);
    },
  });
};

// Delete Saved Item
export const useDeleteSavedItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSavedItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["saved-items"]);
    },
  });
};

export const useCheckSaved = (postId) => {
  return useQuery({
    queryKey: ["saved-status", postId],
    queryFn: () => checkIfPostSaved(postId),
    enabled: !!postId,
  });
};
