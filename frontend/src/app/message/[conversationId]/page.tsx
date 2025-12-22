"use client";
import LeftMessageList from "@/components/layouts/message/LeftMessageList";
import MessageContent from "@/components/layouts/message/MessageContent";
import MessageInformation from "@/components/layouts/message/MessageInformation";
import React, { useState } from "react";

const Message = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  return (
    <div className="mt-4">
      <div className="Pagearea flex gap-6 h-[calc(100vh_-_104px)] ">
        <div className="w-3/12 h-full">
          <LeftMessageList onSelectConversation={setSelectedConversationId} />
        </div>
        <div className="w-6/12 h-full bg-white">
          {selectedConversationId ? (
            <MessageContent conversationId={selectedConversationId} />
          ) : (
            <div className="flex-1 mt-6 flex items-center justify-center text-gray-400">
              Select a conversation
            </div>
          )}
        </div>
        <div className="w-3/12 h-full">
          <MessageInformation />
        </div>
      </div>
    </div>
  );
};

export default Message;
