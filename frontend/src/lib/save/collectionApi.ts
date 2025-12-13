import { CollectionType } from "@/types/save/collectionTypes";
// lib/save/collectionApi.ts

import axiosInstance from "@/lib/axios";

// Create a new collection
export const createCollectionApi = async (data: {
  name: string;
  description?: string;
}): Promise<CollectionType> => {
  const res = await axiosInstance.post("/saves/collections", data);
  return res.data;
};

// Get all collections for logged-in user
export const getCollectionsApi = async (): Promise<CollectionType[]> => {
  const res = await axiosInstance.get("/saves/collections");
  return res.data;
};

// Update a collection
export const updateCollectionApi = async (
  id: string,
  data: { name: string; description?: string }
): Promise<CollectionType> => {
  const res = await axiosInstance.put(`/saves/collections/${id}`, data);
  return res.data;
};

// Delete a collection
export const deleteCollectionApi = async (
  id: string
): Promise<{ message: string }> => {
  const res = await axiosInstance.delete(`/saves/collections/${id}`);
  return res.data;
};

// Get Single Collection
export const getSingleCollectionApi = async (
  id: string
): Promise<CollectionType> => {
  const res = await axiosInstance.get(`/saves/collections/${id}`);
  return res.data;
};

export const getDefaultCollection = async () => {
  try {
    const res = await axiosInstance.get("saves/collections/saved/default");
    return res.data;
  } catch (err) {
    console.error("Error fetching default collection:", err.message);
    throw err;
  }
};
