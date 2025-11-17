import axiosInstance from "../axios";
import { ReactionResponse } from "@/types/reactionTypes";
import { ReactionItem } from "@/types/reactionTypes";

export async function getReactionsByPost(
  postId: string
): Promise<ReactionResponse | null> {
  try {
    const response = await axiosInstance.get(`/reactions/post/${postId}`);

    return response.data as ReactionResponse;
  } catch (error: any) {
    console.error("❌ Reaction Fetch Error:", error?.message || error);
    return null;
  }
}
