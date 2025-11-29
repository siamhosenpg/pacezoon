// src/lib/api/userApi.ts
import axiosInstance from "../axios";

export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};
