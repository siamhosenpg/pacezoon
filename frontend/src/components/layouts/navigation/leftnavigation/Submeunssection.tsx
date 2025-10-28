import React from "react";
// icons
import { LuSun } from "react-icons/lu";
import { FiMoon } from "react-icons/fi";

const Leftnavigationlist = [
  {
    name: "Creator Dashboard",
    links: "/saved",
    image: "/icons/friends.png",
  },
  {
    name: "Saved Posts",
    links: "/group",
    image: "/icons/group.png",
  },
  {
    name: "Monetization",
    links: "/events",
    image: "/icons/event.png",
  },
  {
    name: "Watch History ",
    links: "/news",
    image: "/icons/news.png",
  },
  {
    name: "Setting & Privicy",
    links: "/setting",
    image: "/icons/setting.png",
  },
  {
    name: "Help & Support",
    links: "/help",
    image: "/icons/help.png",
  },
  {
    name: "Dark Mode",
    links: "/darkmode",
    image: "/icons/moon.png",
  },
  {
    name: "Log Out",
    links: "/logout",
    image: "/icons/logout.png",
  },
];

const Submeunssection = () => {
  return (
    <div className=" mt-3 p-3 bg-background rounded-lg">
      <div className=" text-primary flex gap-4 mt-1 mb-1 items-center px-5 py-2 hover:bg-background rounded-lg ">
        <div>Theme</div>
        <div className="ml-auto cursor-pointer"></div>

        <FiMoon className=" text-lg" />

        <LuSun className=" text-lg" />
      </div>
      {Leftnavigationlist.map((list, index) => {
        return (
          <div className="flex gap-4 mt-1 mb-1 items-center px-5 py-2 hover:bg-background rounded-lg">
            <img className="w-[24px] " src="/images/profile.jpg" alt="" />
            <div className="text-[15px] font-semibold text-primary">
              {list.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Submeunssection;
