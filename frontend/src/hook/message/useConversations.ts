// src/hooks/useConversations.ts
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getConversations,
  getOrCreateConversation,
} from "@/lib/message/conversation";
import { ConversationType } from "@/types/message/Conversation";

export const useConversations = () => {
  return useQuery<ConversationType[], Error>({
    queryKey: ["conversations"],
    queryFn: getConversations,
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  });
};

export const useCreateConversation = (
  onSuccess: (conversation: ConversationType) => void
) => {
  return useMutation<ConversationType, Error, string>({
    mutationFn: (userId: string) => getOrCreateConversation(userId),
    onSuccess: (conversation) => {
      onSuccess(conversation);
    },
  });
};
