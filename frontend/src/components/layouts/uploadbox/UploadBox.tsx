"use client";
import React from "react";
import { FaImages } from "react-icons/fa6";
import { MdKeyboardVoice } from "react-icons/md";
import { MdVideoCameraBack } from "react-icons/md";
import { RiLiveFill } from "react-icons/ri";
import CreatePostCard from "../createpost/CreatePostCard";

import { useState } from "react";
import { useAuth } from "@/hook/useAuth";
import Link from "next/link";
import CreateVideoBox from "../createpost/CreateVideoBox";

const UploadBox = ({}) => {
  const { user, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const [openvideo, setOpenvideo] = useState(false);
  return (
    <div className="w-full bg-background  rounded-none lg:rounded-lg px-4 sm:px-6 py-3 sm:py-4 flex flex-col items-center justify-center mb-2 sm:mb-4">
      <div className="flex items-center justify-between w-full gap-4 mb-2 sm:mb-4 border-b border-border pb-2 sm:pb-4">
        {isLoading && (
          <div className="w-10 h-10 rounded-full bg-background-secondary"></div>
        )}
        <Link
          href={`/profile/${user?.user?.username}`}
          className="image w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full overflow-hidden border border-border"
        >
          <img
            loading="lazy"
            src={user?.user?.profileImage}
            className="w-full h-full object-cover"
            alt=""
          />
        </Link>
        <form onClick={() => setOpen(true)} action="" className="w-full">
          <input
            className="px-4 py-2 font-semibold sm:py-3 text-sm bg-background-secondary text-loose rounded-full w-full outline-none"
            placeholder="What's on your mind?"
            type="text"
          />
        </form>
      </div>
      <div className="flex items-center justify-between w-full gap-4 font-semibold ">
        {/* Upload Image Button */}
        <button
          onClick={() => setOpen(true)}
          className="w-2/6 cursor-pointer flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-background-secondary transition duration-200 ease-in-out"
        >
          <FaImages className="text-xl text-blue-600" />
          <span className="overflow-hidden whitespace-nowrap truncate">
            <span className=" hidden sm:inline-block">Upload</span> Image
          </span>
        </button>

        {/* Conditional Render */}
        {open && <CreatePostCard onClose={() => setOpen(false)} />}
        <button
          onClick={() => setOpenvideo(true)}
          className="w-2/6 flex items-center justify-center gap-2   py-2 rounded-lg hover:bg-background-secondary transition duration-200 ease-in-out"
        >
          <MdVideoCameraBack className="text-xl shrink-0 text-green-700" />{" "}
          <span className=" overflow-hidden whitespace-nowrap text-loose text-ellipsis truncate">
            <span className=" hidden sm:inline-block">Upload</span> Video
          </span>
        </button>
        {openvideo && <CreateVideoBox onClose={() => setOpenvideo(false)} />}
        <button className="w-2/6 flex items-center justify-center gap-2   py-2 rounded-lg hover:bg-background-secondary transition duration-200 ease-in-out">
          <MdKeyboardVoice className="text-xl text-red-600" />{" "}
          <span className=" overflow-hidden whitespace-nowrap text-ellipsis text-loose truncate">
            <span className=" hidden sm:inline-block">Upload</span> Voice
          </span>
        </button>
      </div>
    </div>
  );
};

export default UploadBox;
