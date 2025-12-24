import React from "react";
import { NavigationData } from "./navigationdata";
import Link from "next/link";
const Mobilenav = () => {
  return (
    <div className=" w-full  lg:hidden ">
      <div className="NavMobile   h-12 pb-2 flex  items-center">
        <ul className=" w-full flex items-center justify-between px-2  gap-2">
          {NavigationData.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                href={item.href}
                key={item.name}
                className=" flex flex-col  shrink-0  items-center   hover:bg-background-secondary rounded cursor-pointer"
              >
                <div className=" text-[26px] relative">
                  {Icon && <Icon />}
                  <div className="bg-green-600 hidden w-[11px] h-[11px] rounded-full border-background border-2 absolute top-0 right-0"></div>
                </div>
                <span className="  text-[10px] font-medium hidden   ">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Mobilenav;
