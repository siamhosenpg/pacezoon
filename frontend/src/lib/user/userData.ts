import axiosInstance from "../axios";
import { UserType } from "@/types/userType";
/**
 * 🔹 Fetch all users
 */
export const getAllUsers = async (): Promise<UserType[]> => {
  try {
    const response = await axiosInstance.get<UserType[]>("/users/user");
    return response.data;
  } catch (err: any) {
    console.error("Error fetching users:", err.message);
    return [];
  }
};

/**
 * 🔹 Fetch user by userid
 */
export const getUserByUserid = async (
  userid: number
): Promise<UserType | null> => {
  try {
    const response = await axiosInstance.get<UserType>(`/users/user/${userid}`);
    return response.data;
  } catch (err: any) {
    console.error("Error fetching user:", err.message);
    return null;
  }
};

export const getSuggestedUsers = async (): Promise<UserType[]> => {
  try {
    const response = await axiosInstance.get("/users/suggested");
    return response.data.users; // IMPORTANT ✔
  } catch (err: any) {
    console.error("Error fetching users:", err.message);
    return [];
  }
};
