// hooks/useReactions.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReaction,
  updateReaction,
  deleteReaction,
  getReactionsByPost,
  getReactionCount,
} from "@/lib/api/reactionApi";
import { useAuth } from "@/hook/useAuth";
import { ReactionItem } from "@/types/reactionTypes";

export const useReactions = (postId: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const userId = user?.user?._id;

  /* ---------------------------------------------------
   * GET REACTIONS
   * --------------------------------------------------- */
  const { data, isLoading } = useQuery({
    queryKey: ["reactions", postId],
    queryFn: () => getReactionsByPost(postId),
    enabled: !!postId,
  });

  /* ---------------------------------------------------
   * CREATE REACTION (Optimistic)
   * --------------------------------------------------- */
  const createMutation = useMutation({
    mutationFn: createReaction,

    onMutate: async (variables: { postId: string; reaction: string }) => {
      await queryClient.cancelQueries({ queryKey: ["reactions", postId] });

      const previousData = queryClient.getQueryData<any>(["reactions", postId]);

      // Optimistic UI update
      queryClient.setQueryData(["reactions", postId], (old: any) => {
        if (!old || !userId) return old;

        return {
          ...old,
          reactions: [
            ...old.reactions,
            {
              _id: "optimistic",
              postId,
              reaction: variables.reaction,
              userId: { _id: userId },
              createdAt: new Date().toISOString(),
            },
          ],
        };
      });

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["reactions", postId], context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reactions", postId] });
      queryClient.invalidateQueries({ queryKey: ["reactionCount", postId] });
    },
  });

  /* ---------------------------------------------------
   * DELETE REACTION (Optimistic)
   * --------------------------------------------------- */
  const deleteMutation = useMutation({
    mutationFn: deleteReaction,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["reactions", postId] });

      const previousData = queryClient.getQueryData<any>(["reactions", postId]);

      queryClient.setQueryData(["reactions", postId], (old: any) => {
        if (!old || !userId) return old;

        return {
          ...old,
          reactions: old.reactions.filter(
            (r: ReactionItem) =>
              r?.userId?._id !== userId && r?.userId?.id !== userId
          ),
        };
      });

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["reactions", postId], context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reactions", postId] });
      queryClient.invalidateQueries({ queryKey: ["reactionCount", postId] });
    },
  });

  /* ---------------------------------------------------
   * UPDATE REACTION (Optimistic)
   * --------------------------------------------------- */
  const updateMutation = useMutation({
    mutationFn: updateReaction,

    onMutate: async (variables: { postId: string; reaction: string }) => {
      await queryClient.cancelQueries({ queryKey: ["reactions", postId] });

      const previousData = queryClient.getQueryData<any>(["reactions", postId]);

      // Optimistic update
      queryClient.setQueryData(["reactions", postId], (old: any) => {
        if (!old || !userId) return old;

        return {
          ...old,
          reactions: old.reactions.map((r: ReactionItem) => {
            const rUserId = r?.userId?._id || r?.userId?.id;

            if (String(rUserId) === String(userId)) {
              return {
                ...r,
                reaction: variables.reaction, // 🔥 update reaction instantly
              };
            }

            return r;
          }),
        };
      });

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      // rollback
      queryClient.setQueryData(["reactions", postId], context?.previousData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["reactions", postId] });
      queryClient.invalidateQueries({ queryKey: ["reactionCount", postId] });
    },
  });
  /* ---------------------------------------------------
   * REACTION COUNT
   * --------------------------------------------------- */
  const reactionCountQuery = useQuery({
    queryKey: ["reactionCount", postId],
    queryFn: () => getReactionCount(postId),
    enabled: !!postId,
  });

  return {
    data,
    isLoading,
    reactionCountQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
