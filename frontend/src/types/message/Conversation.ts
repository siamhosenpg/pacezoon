// src/types/Conversation.ts

import { UserType } from "../userType";
import { MessageType } from "./Message";

export interface ConversationType {
  _id: string;
  participants: UserType[];
  lastMessage?: MessageType | null;
  createdAt: string;
  updatedAt: string;
}
