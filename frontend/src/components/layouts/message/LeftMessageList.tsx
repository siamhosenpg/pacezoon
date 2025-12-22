"use client";
import React, { useEffect, useState } from "react";
import { useConversations } from "@/hook/message/useConversations";
import { ConversationType } from "@/types/message/Conversation";
import { getSocket } from "@/lib/socket";

import { IoSearch } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";

type Props = {
  onSelectConversation: (conversationId: string) => void;
};

const LeftMessageList = ({ onSelectConversation }: Props) => {
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
    <div className="h-full w-full bg-background rounded-lg overflow-hidden py-3 flex flex-col">
      <div className="px-3 h-auto border-b border-border pb-3">
        <form
          className="bg-background-secondary rounded-full w-full flex items-center justify-between p-1"
          action=""
        >
          <input
            className="font-semibold py-2 px-4 w-full block"
            type="text"
            placeholder="Search User"
          />
          <button className=" w-10 h-10 overflow-hidden flex items-center justify-center shrink-0 bg-white rounded-full">
            <IoSearch className="text-xl" />
          </button>
        </form>
      </div>
      <div className=" px-3 h-full overflow-y-auto py-4">
        <ul className="flex flex-col gap-1 ">
          {conversations?.map((conv) => (
            <li
              key={conv._id}
              onClick={() => onSelectConversation(conv._id)}
              className="p-2 flex items-center gap-2 hover:bg-background-secondary rounded-lg cursor-pointer"
            >
              <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={conv.participants[1].profileImage}
                  alt={conv.participants[1].username}
                />
              </div>
              <div className="w-full">
                <div className="font-bold flex items-center justify-between relative">
                  <h3>{conv.participants[1].username}</h3>
                  <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-background absolute right-0 z-30 cursor-pointer">
                    <HiDotsHorizontal className=" text-lg" />
                  </button>
                </div>
                <p className="line-clamp-1 text-sm  ">
                  {conv.lastMessage?.text || "No messages yet"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftMessageList;
