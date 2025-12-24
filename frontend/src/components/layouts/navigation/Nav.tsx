"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { NavigationData } from "./navigationdata";
import Searchboxnav from "../../ui/Searchboxnav";
import NavRightSide from "./NavRightSide";
import Mobilenav from "./Mobilenav";

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();

  // 🔥 Root click special behavior
  const handleRootClick = (href: string) => {
    // যদি root না হয় → normal navigation
    if (pathname !== href) {
      router.push(href);
      return;
    }

    // যদি already root এ থাকি
    if (window.scrollY > 0) {
      // scroll করা থাকলে → top এ যাবে
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // একদম top এ থাকলে → reload
      window.location.reload();
    }
  };

  return (
    <nav className="w-full pt-1 lg:pt-0  border-b border-border fixed top-0 left-0 bg-background z-50 px-4 lg:px-6 ">
      <div className="Pagearea  flex gap-2 lg:gap-4 justify-between items-center h-14 lg:h-17">
        {/* Logo + Search */}
        <div className="flex items-center  justify-between lg:justify-start gap-4 w-full lg:w-3/12">
          <h1 className="w-10 h-full flex items-center justify-center overflow-hidden">
            <img
              className="w-full h-full object-center "
              src="/images/hiya.png"
              alt=""
            />
          </h1>
          <Searchboxnav />
        </div>

        {/* Center Navigation */}
        <ul className="w-6/12 hidden lg:flex items-center justify-center px-2 py-1 gap-2">
          {NavigationData.map((item) => {
            const Icon = item.icon;

            // 🔥 Special logic only for "/"
            if (item.href === "/") {
              return (
                <li
                  key={item.name}
                  onClick={() => handleRootClick(item.href)}
                  className="flex gap-2 items-center px-4 py-2 hover:bg-background-secondary rounded cursor-pointer"
                >
                  <div className="text-[22px] relative">{Icon && <Icon />}</div>
                  <span className="font-semibold">{item.name}</span>
                </li>
              );
            }

            // ✅ Normal links
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
        <NavRightSide />
      </div>
      <Mobilenav />
    </nav>
  );
};

export default Nav;
