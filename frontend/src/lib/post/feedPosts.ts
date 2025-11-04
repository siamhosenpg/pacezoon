import axios from "axios";
import { PostTypes } from "@/types/postType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFeedPosts = async (): Promise<PostTypes[]> => {
  try {
    const response = await axios.get<PostTypes[]>(`${API_URL}/posts`);
    return response.data;
  } catch (err: any) {
    console.error("Error fetching posts:", err.message);
    return [];
  }
};
