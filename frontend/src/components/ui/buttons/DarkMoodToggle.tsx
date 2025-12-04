"use client";

import React from "react";
import { useDarkMode } from "../../../hook/UseDarkMood";
// icons
import { LuSun } from "react-icons/lu";
import { FiMoon } from "react-icons/fi";

const DarkMoodToggle = () => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  return (
    <div className=" text-primary flex gap-4 mt-1 mb-1 items-center px-5 py-2 hover:bg-background rounded-lg ">
      <div>Theme</div>
      <div
        onClick={toggleDarkMode}
        className="ml-auto cursor-pointer bg-background-secondary  w-[50px] h-7 rounded-full flex items-center p-1 relative"
      >
        <div
          className={`w-[22px] h-[22px] flex items-center justify-center bg-white rounded-full  duration-300 p-1 ${
            darkMode ? "ml-5" : "ml-0"
          }`}
        >
          {darkMode ? (
            <FiMoon className=" text-lg" />
          ) : (
            <LuSun className=" text-lg" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DarkMoodToggle;
