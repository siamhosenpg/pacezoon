"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCollectionApi,
  getCollectionsApi,
  updateCollectionApi,
  deleteCollectionApi,
  getSingleCollectionApi,
  getDefaultCollection,
} from "@/lib/save/collectionApi";
import type { CollectionType } from "@/types/save/collectionTypes";

/* ======================================================
 * GET All Collections
 * ====================================================== */
export const useCollections = () => {
  return useQuery<CollectionType[]>({
    queryKey: ["collections"],
    queryFn: getCollectionsApi,
  });
};

/* ======================================================
 * CREATE Collection
 * ====================================================== */
export const useCreateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollectionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};

/* ======================================================
 * UPDATE Collection
 * ====================================================== */
export const useUpdateCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { name: string; description?: string };
    }) => updateCollectionApi(id, data),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      queryClient.invalidateQueries({ queryKey: ["collection", id] });
    },
  });
};

/* ======================================================
 * DELETE Collection
 * ====================================================== */
export const useDeleteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCollectionApi(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
};

/* ======================================================
 * GET Single Collection
 * ====================================================== */
export const useSingleCollection = (id: string) => {
  return useQuery<CollectionType>({
    queryKey: ["collection", id],
    queryFn: () => getSingleCollectionApi(id),
    enabled: !!id,
  });
};

export const useDefaultCollection = () => {
  return useQuery({
    queryKey: ["defaultCollection"],
    queryFn: getDefaultCollection,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
};
