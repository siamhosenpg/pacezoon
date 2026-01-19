"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaCaretDown, FaRegBell } from "react-icons/fa";
import { useAuth } from "@/hook/useAuth";
import NotificationBox from "../notification/NotificationBox";
import Link from "next/link";
import { useUnreadNotificationCount } from "@/hook/notifications/useNotifications";

const NavRightSide = () => {
  const { user, isLoading } = useAuth();
  const { data: unreadCount } = useUnreadNotificationCount();
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
    <div className="w-fit  shrink-0 lg:w-3/12 flex items-center justify-end gap-1 sm:gap-2 lg:gap-5">
      {/* 🔔 Notification Wrapper */}
      <div ref={notificationRef} className="relative">
        <button
          onClick={toggleNotification}
          className="w-8 h-8 flex items-center relative  justify-center cursor-pointer hover:bg-background-secondary rounded-full"
        >
          <FaRegBell className="text-lg" />
          {unreadCount === undefined || unreadCount === 0 ? null : (
            <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[11px] font-medium flex items-center justify-center">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
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
            <Link href={`/profile/${currentUser.username}`}>
              <img
                className="w-[34px] h-[34px] rounded-full border border-border object-cover"
                src={
                  currentUser?.profileImage
                    ? currentUser?.profileImage
                    : currentUser?.gender === "female"
                      ? "/images/femaleprofile.jpg"
                      : "/images/profile.jpg" // male or default
                }
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
