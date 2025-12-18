import axiosInstance from "../axios";
import { UserType } from "@/types/userType";

// 🧠 API response type
export interface PeopleResponse {
  count: number;
  users: UserType[];
}

// 🔥 Get people suggestions
export const getPeopleSuggestions = async (): Promise<PeopleResponse> => {
  const res = await axiosInstance.get("/peoples/suggestions");
  return res.data;
};
