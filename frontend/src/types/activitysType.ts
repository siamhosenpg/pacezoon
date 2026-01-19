export type ActivityStyleType =
  | "react"
  | "comment"
  | "follow"
  | "share"
  | "post";

export interface ActivityTarget {
  postId?: {
    _id: string;
    title?: string;
    content?: {
      media: string;
      caption: string;
      type: string;
    };
  } | null;

  commentId?: {
    _id: string;
    content?: string;
  } | null;

  followId?: {
    _id: string;
    name?: string;
    username?: string;
    profileImage?: string;
    userid?: string;
  } | null;
}

export interface ActivityType {
  _id: string;
  userId: string;
  type: ActivityStyleType;
  target: ActivityTarget;
  read?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityResponse {
  success: boolean;
  count: number;
  data: ActivityType[];
}
