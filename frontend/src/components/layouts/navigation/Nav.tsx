"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { NavigationData } from "./navigationdata";
import Searchboxnav from "../../ui/Searchboxnav";
import Link from "next/link";
import { FaCaretDown, FaRegBell } from "react-icons/fa";
import { useAuth } from "@/hook/useAuth";
import NotificationBox from "../notification/NotificationBox";

const Nav = () => {
  const { user, isLoading } = useAuth();

  const currentUser = user?.user; // safer

  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // 🔁 Toggle on bell click
  const toggleNotification = () => {
    setOpen((prev) => !prev);
  };

  // ❌ Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <nav className="w-full border-b border-border fixed top-0 left-0 bg-background z-50 px-6">
      <div className="Pagearea flex gap-4 justify-between items-center h-15 lg:h-17">
        {/* Logo + Search */}
        <div className="flex items-center gap-4 w-full lg:w-3/12">
          <h1 className="text-2xl font-bold">Po</h1>
          <Searchboxnav />
        </div>

        {/* Center Navigation */}
        <ul className="w-6/12 hidden lg:flex items-center justify-center px-2 py-1 gap-2">
          {NavigationData.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                href={item.href}
                key={item.name}
                className="flex gap-2 items-center px-4 py-2 hover:bg-background-secondary rounded cursor-pointer"
              >
                <div className="text-[22px] relative">{Icon && <Icon />}</div>
                <span className="font-semibold">{item.name}</span>
              </Link>
            );
          })}
        </ul>

        {/* Right Section */}
        <div className="w-fit shrink-0 lg:w-3/12 flex items-center justify-end gap-4 lg:gap-5">
          <button
            onClick={toggleNotification}
            className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-background-secondary rounded-full"
          >
            <FaRegBell className="text-lg" />
          </button>

          {/* 🔔 Notification Box */}
          {open && <NotificationBox />}

          <div className="flex items-center gap-2">
            {/* 🟡 STATE-1: Loading */}
            {isLoading && (
              <div className="text-sm text-muted-foreground">Loading...</div>
            )}

            {/* 🟢 STATE-2: Logged In */}
            {!isLoading && currentUser && (
              <>
                <Link href={`/profile/${currentUser.userid}`} className="image">
                  <img
                    className="w-[34px] border border-border object-cover h-[34px] rounded-full bg-blue-50"
                    src={currentUser.profileImage}
                    alt={currentUser.name}
                  />
                </Link>

                <div className="hidden sm:block font-semibold text-loose">
                  {currentUser.name}
                </div>

                <FaCaretDown className="hidden sm:block text-loose" />
              </>
            )}

            {/* 🔴 STATE-3: Logged Out */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
