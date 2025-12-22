// src/components/Chat/ChatBox.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMessages } from "@/hook/message/useMessages";
import { getSocket } from "@/lib/socket";
import { MessageType } from "@/types/message/Message";

type Props = {
  conversationId: string;
};

const ChatBox = ({ conversationId }: Props) => {
  const { messagesQuery, sendMessageMutation } = useMessages(conversationId);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages from React Query
  useEffect(() => {
    if (messagesQuery.data) setMessages(messagesQuery.data);
  }, [messagesQuery.data]);

  // Socket.IO: join room & listen for new messages
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    // Join conversation room
    socket.emit("join_conversation", conversationId);

    // Listen for incoming messages
    const handleNewMessage = (message: MessageType) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receive_message", handleNewMessage);

    return () => {
      socket.off("receive_message", handleNewMessage);
    };
  }, [conversationId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSend = () => {
    if (!text.trim()) return;

    // 1️⃣ Send via API
    sendMessageMutation.mutate({ text });

    // 2️⃣ Emit via Socket to server for live update
    const socket = getSocket();
    socket.emit("send_message", { conversationId, text });

    setText("");
  };

  if (messagesQuery.isLoading) return <p>Loading messages...</p>;
  if (messagesQuery.isError) return <p>Error loading messages</p>;

  return (
    <div className="flex flex-col flex-1 h-full border">
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div key={msg._id} className="flex items-start gap-2">
            <img
              src={msg.sender?.profileImage}
              alt={msg.sender?.username}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">{msg.sender?.username}</p>
              <p className="text-sm">{msg?.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 flex gap-2 border-t">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2 focus:outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
