"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "@/lib/api/userApi";
import { useRouter } from "next/navigation";
import type { UserType } from "@/types/userType";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: UserType) => updateUserProfile(data),

    onSuccess: (data) => {
      // assuming backend returns { user, message }
      queryClient.setQueryData(["currentUser"], data.user);
      router.push(`/profile/${data.user.username}`);
    },

    onError: (err: any) => {
      alert(err?.response?.data?.message || "Something went wrong");
    },
  });
}
