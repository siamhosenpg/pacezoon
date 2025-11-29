import React from "react";
import { NavigationData } from "./navigationdata";
import Searchboxnav from "../../ui/Searchboxnav";
import Link from "next/link";
const Mobilenav = () => {
  return (
    <div className=" w-full fixed lg:hidden bottom-0 z-50 bg-background border-t border-border">
      <div className="NavMobile   h-14 flex  items-center">
        <ul className=" w-full grid grid-cols-5 items-center justify-center px-2 py-1  gap-2">
          {NavigationData.map((item) => {
            const Icon = item.icon;
            const ActiveIcon = item.activeIcon;
            return (
              <Link
                href={item.href}
                key={item.name}
                className=" flex flex-col  shrink-0  items-center px-6 py-2 hover:bg-background-secondary rounded cursor-pointer"
              >
                <div className=" text-[24px] relative">
                  {Icon && <Icon />}
                  <div className="bg-green-600 hidden w-[11px] h-[11px] rounded-full border-background border-2 absolute top-0 right-0"></div>
                </div>
                <span className="  text-[11px] font-medium  ">{item.name}</span>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Mobilenav;
