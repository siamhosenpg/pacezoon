import axiosInstance from "../axios";

import { SavedItemType } from "@/types/save/saveitemstype";

/* ======================================================
 * Response Types
 * ====================================================== */

// When checking if post is saved
export interface CheckSavedResponse {
  saved: boolean;
}

// When deleting an item
export interface DeleteSavedResponse {
  message: string;
}

// When saving → backend returns a SavedItem
export type SavePostResponse = SavedItemType;

// When getting folder items → array of SavedItem
export type GetSavedItemsResponse = SavedItemType[];

/* ======================================================
 * API FUNCTIONS (Typed)
 * ====================================================== */

// Save post (auto default or specific collection)
export const savePost = async (
  postId: string,
  collectionId: string = "default"
): Promise<SavePostResponse> => {
  const res = await axiosInstance.post<SavePostResponse>(
    `/items/item/${collectionId}`,
    { postId }
  );
  return res.data;
};

// Get all saved items of a folder
export const getSavedItems = async (
  collectionId: string
): Promise<GetSavedItemsResponse> => {
  const res = await axiosInstance.get<GetSavedItemsResponse>(
    `/items/item/${collectionId}`
  );
  return res.data;
};

// Delete saved item
export const deleteSavedItem = async (
  itemId: string
): Promise<DeleteSavedResponse> => {
  const res = await axiosInstance.delete<DeleteSavedResponse>(
    `/items/item/delete/${itemId}`
  );
  return res.data;
};

// Check if post already saved by user
export const checkIfPostSaved = async (
  postId: string
): Promise<CheckSavedResponse> => {
  const res = await axiosInstance.get<CheckSavedResponse>(
    `/items/check/${postId}`
  );
  return res.data;
};
