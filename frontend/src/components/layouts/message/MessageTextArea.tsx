import MessageText from "@/components/ui/message/MessageText";
import React from "react";

const MessageTextArea = ({ messages }) => {
  return (
    <div className="w-full h-full px-8 py-5  overflow-y-auto">
      <MessageText messages={messages} />
    </div>
  );
};

export default MessageTextArea;
