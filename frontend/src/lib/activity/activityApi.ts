import axiosInstance from "../axios";
import { ActivityResponse } from "@/types/activitysType";

interface GetActivitiesParams {
  limit?: number;
  skip?: number;
}

/**
 * 🔥 Get logged-in user activities
 */
export const getUserActivitiesApi = async (
  params?: GetActivitiesParams
): Promise<ActivityResponse> => {
  const res = await axiosInstance.get("/activities", {
    params,
  });

  return res.data;
};

/**
 * 🔥 Get last 4 activities of logged-in user
 */
export const getLastFourUserActivitiesApi =
  async (): Promise<ActivityResponse> => {
    const res = await axiosInstance.get("/activities/last");
    return res.data;
  };
