"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  savePost,
  getSavedItems,
  deleteSavedItem,
  checkIfPostSaved,
} from "@/lib/save/savedItems";

import type {
  CheckSavedResponse,
  SavePostResponse,
  GetSavedItemsResponse,
  DeleteSavedResponse,
} from "@/types/save/saveitemstype";

/* ======================================================
 * useSavedItems – Get all items from a collection
 * ====================================================== */
export const useSavedItems = (collectionId: string) => {
  return useQuery<GetSavedItemsResponse>({
    queryKey: ["saved-items", collectionId] as const,
    queryFn: () => getSavedItems(collectionId),
    enabled: !!collectionId,
  });
};

/* ======================================================
 * useSavePost – Save a post into a folder
 * ====================================================== */

interface SavePostArgs {
  postId: string;
  collectionId?: string;
}

export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation<SavePostResponse, Error, SavePostArgs>({
    mutationFn: ({ postId, collectionId = "default" }) =>
      savePost(postId, collectionId),

    // FIX: The query key must be typed correctly
    onSuccess: (_, { collectionId = "default" }) => {
      queryClient.invalidateQueries({
        queryKey: ["saved-items", collectionId],
      });
    },
  });
};

/* ======================================================
 * useDeleteSavedItem – Remove saved item
 * ====================================================== */
export const useDeleteSavedItem = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteSavedResponse, Error, string>({
    mutationFn: (itemId) => deleteSavedItem(itemId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["saved-items"],
      });
    },
  });
};

/* ======================================================
 * useCheckSaved – Check if post is saved by this user
 * ====================================================== */
export const useCheckSaved = (postId: string) => {
  return useQuery<CheckSavedResponse>({
    queryKey: ["saved-status", postId] as const,
    queryFn: () => checkIfPostSaved(postId),
    enabled: !!postId,
  });
};
