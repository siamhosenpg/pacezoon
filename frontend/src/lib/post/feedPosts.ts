// src/lib/api/postApi.ts

import axiosInstance from "../axios";
import { PostTypes } from "@/types/postType";

// 🔵 Global Reusable API Error Handler
const handleApiError = (error: any): never => {
  if (error.response) {
    throw new Error(error.response.data?.message || "Server error occurred");
  } else if (error.request) {
    throw new Error("Network Error: No response from server");
  } else {
    throw new Error(error.message || "Unexpected error");
  }
};

// 🟢 Get all feed posts
export const getFeedPosts = async (): Promise<PostTypes[]> => {
  try {
    const response = await axiosInstance.get<PostTypes[]>("/posts");
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    throw error; // ⬅ required for TypeScript safety
  }
};

// 🟢 Get single post
export const getSinglePost = async (id: string): Promise<PostTypes> => {
  try {
    const response = await axiosInstance.get<PostTypes>(`/posts/post/${id}`);
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

// 🟢 Get posts by specific userId
export const getPostsByUserId = async (
  userid: string
): Promise<PostTypes[]> => {
  try {
    const response = await axiosInstance.get<PostTypes[]>(
      `/posts/user/${userid}`
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

// 🟢 Create new post (TEXT + IMAGE + VIDEO)
export const createPost = async (formData: FormData): Promise<PostTypes> => {
  try {
    const response = await axiosInstance.post<PostTypes>(
      "/posts", // ⚠️ backend route
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

// 🟢 Update post
export const updatePost = async (
  postId: string,
  updatedData: Partial<PostTypes>
): Promise<PostTypes> => {
  try {
    const response = await axiosInstance.put<PostTypes>(
      `/posts/${postId}`,
      updatedData
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

// 🟢 Delete post
export const deletePost = async (postId: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/posts/${postId}`);
    return true;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

// 🟢 Share a post (caption only)
export const sharePost = async (data: {
  parentPost: string;
  caption?: string;
  privacy?: "public" | "friends" | "private";
}): Promise<PostTypes> => {
  try {
    const response = await axiosInstance.post<PostTypes>("/posts/share", data);

    return response.data;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};
