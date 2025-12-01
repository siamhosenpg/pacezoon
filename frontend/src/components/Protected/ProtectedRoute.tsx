"use client";
import { useEffect } from "react";
import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { user, isLoading } = useAuth(); // useAuth hook থেকে login user info
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login"); // যদি login না থাকে → login page এ redirect
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="fixed top-[62px] w-full h-1.2 overflow-hidden z-50">
        <motion.div
          className="h-full w-[200%] bg-gradient-to-r from-green-500 via-red-500 to-blue-500"
          animate={{ x: ["0%", "-50%", "0%"] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    ); // data আসার আগে spinner/loader দেখাবে
  }

  return <>{children}</>; // login user হলে children দেখাবে
};
