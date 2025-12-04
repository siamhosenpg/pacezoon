"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
} from "@/lib/api/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserType } from "@/types/userType";

interface UseAuthOptions {
  fetchUser?: boolean;
}
interface user {
  user: UserType;
  token: string;
}

export const useAuth = (options?: UseAuthOptions) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fetchUser = options?.fetchUser ?? true;

  const [error, setError] = useState<string | null>(null);

  // ===================== Current User =====================
  const { data: user, isLoading } = useQuery<user | null>({
    queryKey: ["currentUser"],
    enabled: fetchUser,
    retry: false,
    queryFn: async () => {
      try {
        return await getCurrentUser();
      } catch (err: any) {
        // 401 হলে currentUser null করে দাও
        if (err.response?.status === 401) {
          queryClient.setQueryData(["currentUser"], null);
        }

        // error propagate করো যাতে React Query জানতে পারে
        throw err;
      }
    },
  });

  // ===================== Login =====================
  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push("/");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    },
  });

  // ===================== Register =====================
  const register = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push("/");
    },
    onError: (err: any) => {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
    },
  });

  // ===================== Logout =====================
  const logout = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["currentUser"], null);
      queryClient.clear();
      router.push("/login");
    },
    onError: (err: any) => {
      console.error("Logout error:", err);
    },
  });

  return { user, isLoading, login, register, logout, error, setError };
};
