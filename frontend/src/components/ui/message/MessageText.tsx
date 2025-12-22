import React, { useEffect, useRef } from "react";

import { MessageType } from "@/types/message/Message";

type Props = {
  messages: MessageType[];
};
const MessageText = ({ messages }: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="  w-full ">
      <div className="w-full flex flex-col items-start mt-4">
        <p className="max-w-[70%] px-4 py-3 mt-1  bg-background-secondary  font-medium w-fit rounded-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos enim
          cumque modi inventore sit, ipsum odit cupiditate expedita.
        </p>
        <div className="text-[12px] max-w-[70%] mt-1 font-medium px-2">
          <span>Sent</span> <span>3:54AM</span>
        </div>
      </div>
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

      <div className="w-full flex flex-col items-end mt-4 ">
        <p className=" max-w-[70%] px-4 py-3 mt-1 bg-accent text-white font-medium w-fit rounded-xl">
          বহুকাল হইলো আমি একবার পালামৌ প্রদেশে গিয়াছিলাম, প্রত্যাগমন করিলে পর
          সেই অঞ্চলের বৃত্তান্ত লিখিবার নিমিত্ত দুই-এক জন বন্ধুবান্ধব আমাকে
          পুনঃপুন অনুরোধ করিতেন, আমি তখন তাঁহাদের উপহাস করিতাম।
        </p>
        <p className=" max-w-[70%] px-4 py-3 mt-1 bg-accent text-white font-medium w-fit rounded-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos enim
          cumque modi inventore sit.
        </p>
        <div className=" max-w-[70%] text-[12px] mt-1 font-medium px-2">
          <span>Sent</span> <span>3:54AM</span>
        </div>
      </div>

      <div className="w-full flex flex-col items-start mt-4">
        <p className="max-w-[70%] px-4 py-3 mt-1  bg-background-secondary  font-medium w-fit rounded-xl">
          সেকালের হরকরা নামক ইংরেজি পত্রিকায় দেখিতাম, কোনো একজন মিলিটারি সাহেব
          পেরেড বৃত্তান্ত, ব্যান্ডের বাদ্যচর্চা প্রভৃতি নানা কথা পালামৌ হইতে
          লিখিতেন।
        </p>
        <div className="text-[12px] max-w-[70%] mt-1 font-medium px-2">
          <span>Sent</span> <span>3:54AM</span>
        </div>
      </div>

      <div className="w-full flex flex-col items-end mt-4 ">
        <p className=" max-w-[70%] px-4 py-3 mt-1 bg-accent text-white font-medium w-fit rounded-xl">
          বহুকাল হইলো আমি একবার পালামৌ প্রদেশে গিয়াছিলাম, প্রত্যাগমন করিলে পর
          সেই অঞ্চলের বৃত্তান্ত লিখিবার নিমিত্ত দুই-এক জন বন্ধুবান্ধব আমাকে
          পুনঃপুন অনুরোধ করিতেন আমি তখন তাঁহাদের উপহাস করিতাম।
        </p>
        <p className=" max-w-[70%] px-4 py-3 mt-1 bg-accent text-white font-medium w-fit rounded-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos enim
          cumque modi inventore sit.
        </p>
        <div className=" max-w-[70%] text-[12px] mt-1 font-medium px-2">
          <span>Sent</span> <span>3:54AM</span>
        </div>
      </div>

      <div className="w-full flex flex-col items-start mt-4">
        <p className="max-w-[70%] px-4 py-3 mt-1  bg-background-secondary  font-medium w-fit rounded-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos enim
          cumque modi inventore sit, ipsum odit cupiditate expedita.
        </p>
        <div className="text-[12px] max-w-[70%] mt-1 font-medium px-2">
          <span>Sent</span> <span>3:54AM</span>
        </div>
      </div>
    </div>
  );
};

export default MessageText;
