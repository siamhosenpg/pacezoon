import React from "react";
import { NavigationData } from "./navigationdata";
import Searchboxnav from "../../ui/Searchboxnav";
import Link from "next/link";
// Icons
import { FaCaretDown } from "react-icons/fa"; // Dropdown icon
import { FaRegBell } from "react-icons/fa"; // Notification icon
import { FaBell } from "react-icons/fa6"; // Notification icon filled

const Nav = () => {
  return (
    <nav className="w-full border-b border-border fixed top-0 left-0 bg-background z-50 px-6">
      <div className="Pagearea flex gap-4 justify-between items-center h-15 lg:h-17 ">
        <div className="flex items-center gap-4 w-full lg:w-3/12">
          <h1 className=" text-2xl font-bold">Po</h1>
          <Searchboxnav />
        </div>
        <ul className=" w-6/12 hidden lg:flex items-center justify-center px-2 py-1  gap-2">
          {NavigationData.map((item) => {
            const Icon = item.icon;
            const ActiveIcon = item.activeIcon;
            return (
              <Link
                href={item.href}
                key={item.name}
                className="flex gap-2 items-center px-4 py-2 hover:bg-background-secondary rounded cursor-pointer"
              >
                <div className=" text-[22px] relative">
                  {Icon && <Icon />}
                  <div className="bg-green-600 hidden w-[11px] h-[11px] rounded-full border-background border-2 absolute top-0 right-0"></div>
                </div>
                <span className=" font-semibold">{item.name}</span>
              </Link>
            );
          })}
        </ul>
        <div className=" w-fit shrink-0 lg:w-3/12 flex items-center justify-end gap-4 lg:gap-5  ">
          <div className=" flex items-center text-lg">
            <FaRegBell />
          </div>
          <div className="flex items-center justify-end gap-2">
            <div className="image">
              <img
                className="w-[34px] border border-border h-[34px] rounded-full bg-blue-50"
                src="/images/profile.jpg"
                alt=""
              />
            </div>
            <div className=" hidden sm:block font-semibold text-loose">
              Siam Hossen
            </div>
            <FaCaretDown className="text-loose hidden sm:block" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
