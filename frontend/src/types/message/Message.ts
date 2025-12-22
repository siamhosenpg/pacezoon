// src/types/Message.ts
import { UserType } from "../userType";

export interface MessageType {
  _id: string;
  conversationId: string;
  sender: UserType;
  text?: string;
  media?: string;
  seenBy: string[]; // array of userIds
  createdAt: string;
  updatedAt: string;
}
