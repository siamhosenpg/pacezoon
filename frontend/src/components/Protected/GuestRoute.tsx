// src/components/protected/GuestRoute.tsx
"use client";
import { useEffect } from "react";
import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";

type Props = { children: React.ReactNode };

export const GuestRoute = ({ children }: Props) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/"); // login user হলে home page এ redirect
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div></div>;

  return <>{children}</>;
};
