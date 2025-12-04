export type ReactionType = "like" | "love" | "haha" | "sad" | "angry" | "wow";

export interface ReactionUser {
  _id: string;
  id?: string;
  name: string;
  username: string;
  profileImage?: string;
}

export interface ReactionItem {
  _id: string;

  postId: string;
  userId: ReactionUser;
  createdAt: string;
  updatedAt: string;
  reaction: ReactionType;
}
export interface ReactionResponse {
  count: number;
  reactions: ReactionItem[];
}
