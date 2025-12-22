// src/pages/chat/[conversationId].tsx
"use client";

import React, { useState } from "react";

import ChatSidebar from "@/components/layouts/chat/ChatSidebar";
import ChatBox from "@/components/layouts/chat/ChatBox";
const ChatPage = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  return (
    <div className="flex h-screen">
      <ChatSidebar onSelectConversation={setSelectedConversationId} />
      {selectedConversationId ? (
        <ChatBox conversationId={selectedConversationId} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a conversation
        </div>
      )}
    </div>
  );
};

export default ChatPage;
