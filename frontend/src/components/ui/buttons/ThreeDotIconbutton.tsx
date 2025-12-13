"use client";
import React, { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PostActionList from "../actionbox/PostActionList";
import { PostTypes } from "@/types/postType";

interface postpropsdata {
  post: PostTypes;
}

const ThreeDotIconButton: React.FC<postpropsdata> = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDialogue = () => setIsOpen((prev) => !prev);

  // 🔹 Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className=" static sm:relative inline-block">
      <button
        onClick={toggleDialogue}
        className="p-2 rounded-full hover:bg-background-secondary transition"
      >
        <BsThreeDotsVertical className="text-xl text-secondary" />
      </button>

      {isOpen && (
        <div className="absolute right-0   w-full z-40">
          <PostActionList post={post} />
        </div>
      )}
    </div>
  );
};

export default ThreeDotIconButton;
