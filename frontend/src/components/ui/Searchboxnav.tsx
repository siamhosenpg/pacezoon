import React from "react";

import { IoSearch } from "react-icons/io5"; // search icon

const Searchboxnav = () => {
  return (
    <form
      action=""
      className="flex items-center justify-between bg-background-secondary rounded-full"
    >
      <input
        type="text"
        className=" px-3 py-2  font-semibold w-full"
        placeholder="Search your items here..."
      />
      <button className=" px-2 py-2 rounded-full flex items-center justify-center">
        <IoSearch className="text-xl text-gray-500 " />
      </button>
    </form>
  );
};

export default Searchboxnav;
