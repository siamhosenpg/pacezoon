"use server";

import axiosInstance from "../axios";
import { CommentType } from "@/types/commentType";

// ---------------------------
// CREATE COMMENT
// ---------------------------
export async function createComment(
  postId: string,
  text: string,
  parentCommentId: string,
): Promise<CommentType> {
  try {
    const res = await axiosInstance.post("/comments", {
      postId,
      text,
      parentCommentId: parentCommentId || null,
    });

    // API returns → { success, message, data: comment }
    return res.data.data as CommentType;
  } catch (err: any) {
    console.error("Create comment error:", err.response?.data || err);
    throw new Error(err.response?.data?.message || "Failed to create comment");
  }
}

// ---------------------------
// GET COMMENTS OF A POST
// ---------------------------
export async function getComments(postId: string): Promise<CommentType[]> {
  try {
    const res = await axiosInstance.get(`/comments/${postId}`);

    // API returns → { success, page, count, data: [...] }
    return res.data.data as CommentType[];
  } catch (err: any) {
    console.error("Get comments error:", err.response?.data || err);
    throw new Error(err.response?.data?.message || "Failed to load comments");
  }
}

// ---------------------------
// UPDATE COMMENT
// ---------------------------
export async function updateComment(
  commentId: string,
  text: string,
): Promise<CommentType> {
  try {
    const res = await axiosInstance.patch(`/comments/${commentId}`, {
      text,
    });

    // API returns → { success, data: updatedComment }
    return res.data.data as CommentType;
  } catch (err: any) {
    console.error("Update comment error:", err.response?.data || err);
    throw new Error(err.response?.data?.message || "Failed to update comment");
  }
}

// ---------------------------
// DELETE COMMENT
// ---------------------------
export async function deleteComment(
  commentId: string,
): Promise<{ message: string }> {
  try {
    const res = await axiosInstance.delete(`/comments/${commentId}`);

    // API returns → { success, message }
    return { message: res.data.message };
  } catch (err: any) {
    console.error("Delete comment error:", err.response?.data || err);
    throw new Error(err.response?.data?.message || "Failed to delete comment");
  }
}

// ===============================
// GET REPLIES FOR A COMMENT
// ===============================
interface GetRepliesParams {
  commentId: string;
  page?: number;
  limit?: number;
}

export interface GetRepliesResponse {
  success: boolean;
  page: number;
  count: number;
  totalReplies: number;
  data: CommentType[];
}

export const getRepliesByComment = async ({
  commentId,
  page = 1,
  limit = 20,
}: GetRepliesParams): Promise<GetRepliesResponse> => {
  const response = await axiosInstance.get<GetRepliesResponse>(
    `/comments/replies/${commentId}?page=${page}&limit=${limit}`,
  );

  return response.data;
};
