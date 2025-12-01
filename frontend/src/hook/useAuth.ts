// src/hooks/useAuth.ts
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

export const useAuth = (options?: { fetchUser?: boolean }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fetchUser = options?.fetchUser ?? true;
  const [error, setError] = useState<string | null>(null);

  // ===================== Current User =====================
  const { data: user, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: fetchUser,
    retry: false,
    onError: (err: any) => {
      if (err.response?.status === 401) {
        // not logged in
        queryClient.setQueryData(["currentUser"], null);
      }
    },
  });

  // ===================== Login =====================
  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
      router.push("/"); // redirect after login
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
      queryClient.invalidateQueries(["currentUser"]);
      router.push("/home"); // redirect after register
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
      router.push("/login");
    },
    onError: (err: any) => {
      console.error("Logout error:", err);
    },
  });

  return { user, isLoading, login, register, logout, error, setError };
};
