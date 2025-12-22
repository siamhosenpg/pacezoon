// src/hooks/useMessages.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMessages, sendMessage } from "@/lib/message/message";
import { MessageType } from "@/types/message/Message";

interface SendMessageInput {
  text?: string;
  media?: string;
}

export const useMessages = (conversationId: string) => {
  const queryClient = useQueryClient();

  // 1️⃣ Fetch messages
  const messagesQuery = useQuery<MessageType[], Error>({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessages(conversationId),
    staleTime: 1000 * 60 * 1,
    refetchOnWindowFocus: false,
  });

  // 2️⃣ Send message
  const sendMessageMutation = useMutation<MessageType, Error, SendMessageInput>(
    {
      mutationFn: ({ text, media }) => sendMessage(conversationId, text, media),
      onSuccess: (message) => {
        queryClient.setQueryData<MessageType[]>(
          ["messages", conversationId],
          (old = []) => [...old, message]
        );
      },
    }
  );

  return { messagesQuery, sendMessageMutation };
};
