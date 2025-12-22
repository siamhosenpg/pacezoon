"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/hook/useAuth";
import { useMessages } from "@/hook/message/useMessages";
import { getSocket } from "@/lib/socket";
import { MessageType } from "@/types/message/Message";

import { useConversations } from "@/hook/message/useConversations";

import MessageInputbox from "@/components/ui/message/MessageInputbox";
import MessageTopBar from "@/components/ui/message/MessageTopBar";
import MessageTextArea from "./MessageTextArea";

type Props = {
  conversationId: string;
};

const MessageContent = ({ conversationId }: Props) => {
  // Current user
  const { user } = useAuth();
  const currentUserId = user?.user._id || "";

  // Fetch conversation
  const {
    data: conversation,
    isLoading: convLoading,
    isError: convError,
  } = useConversations(conversationId);

  // Fetch messages
  const { messagesQuery } = useMessages(conversationId);
  const [messages, setMessages] = useState<MessageType[]>([]);

  // Initialize messages from React Query
  useEffect(() => {
    if (messagesQuery.data) setMessages(messagesQuery.data);
  }, [messagesQuery.data]);

  // Socket.IO: join room & listen for new messages
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.emit("join_conversation", conversationId);

    const handleNewMessage = (message: MessageType) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receive_message", handleNewMessage);

    return () => {
      socket.off("receive_message", handleNewMessage);
    };
  }, [conversationId]);

  // Loading / error handling
  if (convLoading || messagesQuery.isLoading) return <p>Loading...</p>;
  if (convError || messagesQuery.isError)
    return <p>Error loading conversation</p>;
  if (!conversation) return <p>No conversation found</p>;

  return (
    <div className="w-full h-full bg-background rounded-lg flex flex-col justify-between">
      {/* Top Bar */}
      <MessageTopBar
        conversation={conversation}
        currentUserId={currentUserId}
      />

      {/* Messages List */}
      <MessageTextArea messages={messages} />

      {/* Input Box */}
      <MessageInputbox conversationId={conversationId} />
    </div>
  );
};

export default MessageContent;
