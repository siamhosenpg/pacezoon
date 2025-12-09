import { useQuery } from "@tanstack/react-query";
import { getSuggestedUsers } from "@/lib/user/userData";

export const useSuggestedUsers = () => {
  return useQuery({
    queryKey: ["suggested-users"],
    queryFn: getSuggestedUsers,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
