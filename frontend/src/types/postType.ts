interface Content {
  parentPost?: PostTypes;
  caption: string;
  media: string[];
  type: "image" | "video" | "audio" | "text" | string; // media type যদি পরে নতুন type আসে
  location?: string;
  tags?: string[];
  mentions?: string[];
}
interface Profiledata {
  _id: string;
  name: string;
  userid: number;
  username: string;
  badges: string[];
  bio: string;
  profileImage: string;
}

export interface PostTypes {
  _id: string; // MongoDB ObjectId as string
  postid: number;
  userid: Profiledata;
  content: Content;
  likesid?: number[]; // liked by user IDs
  commentsid?: string[]; // comment IDs
  shares?: number[]; // shared by user IDs
  privacy: "public" | "private" | "friends" | string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
