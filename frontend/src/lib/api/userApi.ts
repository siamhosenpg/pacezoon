import axiosInstance from "../axios";

import { UserType } from "@/types/userType";

// Update current user's profile
export const updateUserProfile = async (data: UserType) => {
  const res = await axiosInstance.put(`/users/${data.userid}`, data);
  return res.data;
};

// Get current user profile
export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data.user;
};
