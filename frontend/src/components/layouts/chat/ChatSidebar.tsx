// src/components/Chat/ChatSidebar.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useConversations } from "@/hook/message/useConversations";
import { ConversationType } from "@/types/message/Conversation";
import { getSocket } from "@/lib/socket";

type Props = {
  onSelectConversation: (conversationId: string) => void;
};

const ChatSidebar = ({ onSelectConversation }: Props) => {
  const { data: initialConversations, isLoading, isError } = useConversations();
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  // Initialize local state from React Query
  useEffect(() => {
    if (initialConversations) setConversations(initialConversations);
  }, [initialConversations]);

  // Socket.IO: listen for new messages
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (message: any) => {
      setConversations((prev) =>
        prev.map((conv) =>
          conv._id === message.conversationId
            ? { ...conv, lastMessage: message }
            : conv
        )
      );
    };

    socket.on("receive_message", handleNewMessage);

    return () => {
      socket.off("receive_message", handleNewMessage);
    };
  }, []);

  if (isLoading) return <p>Loading conversations...</p>;
  if (isError) return <p>Error loading conversations</p>;

  return (
    <div className="w-72 border-r h-full overflow-y-auto">
      {conversations?.map((conv) => (
        <div
          key={conv._id}
          onClick={() => onSelectConversation(conv._id)}
          className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
        >
          <img
            src={conv.participants[0].profileImage}
            alt={conv.participants[0].username}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">
              {conv.participants.map((p) => p.username).join(", ")}
            </p>
            <p className="text-sm text-gray-500">
              {conv.lastMessage?.text || "No messages yet"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
