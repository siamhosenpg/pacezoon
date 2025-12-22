// src/api/conversation.ts

import axiosInstance from "../axios";

import { ConversationType } from "@/types/message/Conversation";

export const getConversations = async (): Promise<ConversationType[]> => {
  const res = await axiosInstance.get("/conversations");
  return res.data;
};

export const getOrCreateConversation = async (
  userId: string
): Promise<ConversationType> => {
  const res = await axiosInstance.post("/conversations", { userId });
  return res.data;
};
