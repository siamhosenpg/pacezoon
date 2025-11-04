// /lib/types.ts

export interface Media {
  url: string;
  type: "image" | "video" | "audio" | string; // media type যদি পরে নতুন type আসে
}

export interface Content {
  caption: string;
  media: Media[];
  location?: string;
  tags?: string[];
  mentions?: string[];
}

export interface PostTypes {
  _id: string; // MongoDB ObjectId as string
  postid: number;
  userid: number | string;
  content: Content;
  likesid?: number[]; // liked by user IDs
  commentsid?: string[]; // comment IDs
  shares?: number[]; // shared by user IDs
  privacy: "public" | "private" | "friends" | string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
