export interface UserMini {
  _id: string;
  name: string;
  username?: string;
  profileImage?: string;
  userid?: number;
}

export interface NotificationTarget {
  postId: string | null;
  commentId: string | null;
}

export type NotificationTypeStyle = "follow" | "react" | "comment" | "share";

export interface NotificationType {
  _id: string;
  type: NotificationTypeStyle;
  userId: UserMini;
  actorId: UserMini;
  target: NotificationTarget;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}
