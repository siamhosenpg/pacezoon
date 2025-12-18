"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaRegBell } from "react-icons/fa";
import { useAuth } from "@/hook/useAuth";
import NotificationBox from "../notification/NotificationBox";
import Link from "next/link";

const NavRightSide = () => {
  const { user, isLoading } = useAuth();
  const currentUser = user?.user;

  const [open, setOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // 🔔 Toggle notification
  const toggleNotification = () => {
    setOpen((prev) => !prev);
  };

  // ❌ Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-fit shrink-0 lg:w-3/12 flex items-center justify-end gap-4 lg:gap-5">
      {/* 🔔 Notification Wrapper */}
      <div ref={notificationRef} className="relative">
        <button
          onClick={toggleNotification}
          className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-background-secondary rounded-full"
        >
          <FaRegBell className="text-lg" />
        </button>

        {/* 🔔 Notification Box */}
        {open && <NotificationBox onClose={() => setOpen(false)} />}
      </div>

      {/* 👤 User Info */}
      <div className="flex items-center gap-2">
        {isLoading && (
          <div className="w-10 h-10 rounded-full bg-background-secondary"></div>
        )}

        {!isLoading && currentUser && (
          <>
            <Link href={`/profile/${currentUser.userid}`}>
              <img
                className="w-[34px] h-[34px] rounded-full border border-border object-cover"
                src={currentUser.profileImage}
                alt={currentUser.name}
              />
            </Link>

            <span className="hidden sm:block font-semibold">
              {currentUser.name}
            </span>

            <FaCaretDown className="hidden sm:block" />
          </>
        )}
      </div>
    </div>
  );
};

export default NavRightSide;
