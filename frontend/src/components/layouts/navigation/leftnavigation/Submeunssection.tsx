import DarkMoodToggle from "@/components/ui/buttons/DarkMoodToggle";
import Link from "next/link";
import React from "react";

const Leftnavigationlist = [
  {
    name: "Saved Posts",
    links: "/save",
    image: "/images/icon/save-instagram.png",
  },
  {
    name: "Creator Dashboard",
    links: "/saved",
    image: "/images/icon/layout.png",
  },

  {
    name: "Groups",
    links: "/groups",
    image: "/images/icon/group.png",
  },

  {
    name: "Setting & Privicy",
    links: "/setting",
    image: "/images/icon/setting.png",
  },
  {
    name: "Help & Support",
    links: "/help",
    image: "/images/icon/help-desk.png",
  },

  {
    name: "Log Out",
    links: "/logout",
    image: "/images/icon/logout.png",
  },
];

const Submeunssection = () => {
  return (
    <div className=" mt-3 p-3 bg-background rounded-lg">
      <DarkMoodToggle />
      {Leftnavigationlist.map((list, index) => {
        return (
          <Link
            href={list.links}
            key={index}
            className="flex gap-4 mt-1 mb-1 items-center px-5 py-2 hover:bg-background-secondary duration-150 rounded-lg"
          >
            <img className="w-6 " src={list.image} alt="" />
            <div className="text-[15px] font-semibold text-primary">
              {list.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Submeunssection;
