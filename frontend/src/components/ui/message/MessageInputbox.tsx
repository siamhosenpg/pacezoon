import React, { useState } from "react";
import { useMessages } from "@/hook/message/useMessages";
import { getSocket } from "@/lib/socket";

type Props = {
  conversationId: string;
};

import { FaRegFileLines } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const MessageInputbox = ({ conversationId }: Props) => {
  const { sendMessageMutation } = useMessages(conversationId);
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;

    // 1️⃣ Send via API
    sendMessageMutation.mutate({ text });

    // 2️⃣ Emit via Socket for live update
    const socket = getSocket();
    socket.emit("send_message", { conversationId, text });

    setText("");
  };
  return (
    <div className="h-[70px] border-t border-border px-5 flex items-center w-full shrink-0 ">
      <form className="flex w-full items-center justify-center gap-2" action="">
        <input
          className="px-4 py-3 pl-8 bg-background-secondary rounded-full w-full"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Write messages"
        />
        <button className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full hover:bg-background-secondary cursor-pointer">
          <FaRegFileLines className="text-xl" />
        </button>
        <button
          onClick={handleSend}
          className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full hover:bg-background-secondary cursor-pointer"
        >
          <IoSend className="text-xl" />
        </button>
      </form>
    </div>
  );
};

export default MessageInputbox;
