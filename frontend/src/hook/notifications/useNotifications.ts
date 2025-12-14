import { useQuery } from "@tanstack/react-query";
import { getMyNotifications } from "@/lib/notification/notification";
import { NotificationType } from "@/types/notification";

export const useNotifications = () => {
  return useQuery<NotificationType[]>({
    queryKey: ["notifications"],
    queryFn: getMyNotifications,
    staleTime: 1000 * 30, // 30 seconds
  });
};
