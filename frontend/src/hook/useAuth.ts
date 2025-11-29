// src/hooks/useAuth.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { loginUser, registerUser, logoutUser } from "@/lib/api/authApi";
import { getCurrentUser } from "@/lib/api/userApi";
import { useRouter } from "next/navigation";

export const useAuth = (options?: { fetchUser?: boolean }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fetchUser = options?.fetchUser ?? true; // default: fetch user

  // ✔ Fetch Current User
  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: fetchUser, // only fetch if fetchUser=true
    retry: false, // avoid retrying 401 requests
    onError: (err: any) => {
      if (err.response?.status === 401) {
        // User not logged in → silent fail, no console error
        queryClient.setQueryData(["currentUser"], null);
      }
    },
  });

  // ✔ Login
  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
      router.push("/home");
    },
  });

  // ✔ Register
  const register = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.push("/login");
    },
  });

  // ✔ Logout
  const logout = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      router.push("/login");
    },
  });

  return { user, isLoading, login, register, logout };
};
