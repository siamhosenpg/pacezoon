import axiosInstance from "@/lib/axios";
import { NotificationType } from "@/types/notification";

interface NotificationResponse {
  success: boolean;
  notifications: NotificationType[];
}

export const getMyNotifications = async (): Promise<NotificationType[]> => {
  const res = await axiosInstance.get<NotificationResponse>("/notifications");

  return res.data.notifications;
};
