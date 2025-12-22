// src/components/UserProfile/MessageButton.tsx
"use client";

import React from "react";

import { useCreateConversation } from "@/hook/message/useConversations";
import { ConversationType } from "@/types/message/Conversation";

type Props = {
  userId: string;
  onConversationOpen: (conversation: ConversationType) => void;
};

const MessageButton = ({ userId, onConversationOpen }: Props) => {
  const { mutate: createConversation, isPending } =
    useCreateConversation(onConversationOpen);

  const handleClick = () => {
    createConversation(userId);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      {isPending ? "Opening..." : "Message"}
    </button>
  );
};

export default MessageButton;
