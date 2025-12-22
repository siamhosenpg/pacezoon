// src/api/message.ts

import axiosInstance from "../axios";

import { MessageType } from "@/types/message/Message";

export const getMessages = async (
  conversationId: string
): Promise<MessageType[]> => {
  const res = await axiosInstance.get(`/messages/${conversationId}`);
  return res.data;
};

export const sendMessage = async (
  conversationId: string,
  text?: string,
  media?: string
): Promise<MessageType> => {
  const res = await axiosInstance.post("/messages", {
    conversationId,
    text,
    media,
  });
  return res.data;
};

export const deleteMessage = async (messageId: string) => {
  const res = await axiosInstance.delete(`/messages/${messageId}`);
  return res.data;
};
