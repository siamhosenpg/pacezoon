import axiosInstance from "../axios";

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data: any) => {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
};

export const logoutUser = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await axiosInstance.get("/auth/me");
  return res.data;
};
