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

interface AuthResponse {
  user: UserType;
  token: string;
}

export const useAuth = (options?: UseAuthOptions) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // default true (protected pages), login/register page-এ false দিবি
  const fetchUser = options?.fetchUser ?? true;

  const [error, setError] = useState<string | null>(null);

  // ===================== Current User =====================
  const { data: user, isLoading } = useQuery<AuthResponse | null>({
    queryKey: ["currentUser"],
    enabled: fetchUser,
    retry: false,
    queryFn: async () => {
      try {
        return await getCurrentUser();
      } catch (err: any) {
        // 401 হলে silently null return (NO throw → NO loop)
        if (err.response?.status === 401) {
          return null;
        }

        // অন্য unexpected error হলে throw
        throw err;
      }
    },
  });

  // ===================== Login =====================
  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      // login সফল হলে currentUser refetch
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
      // শুধু auth query clear, পুরো cache না
      queryClient.setQueryData(["currentUser"], null);
      router.push("/login");
    },
    onError: (err: any) => {
      console.error("Logout error:", err);
    },
  });

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    error,
    setError,
  };
};
