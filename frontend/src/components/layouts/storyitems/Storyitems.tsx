"use client";
import StoryAdd from "@/components/ui/storycard/StoryAdd";
import StoryArea from "@/components/ui/storycard/StoryArea";
import React, { useRef, useState, useEffect } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { StoryType } from "@/types/storyType";

interface StoryAreaProps {
  stories: StoryType[];
}

const Storyitems: React.FC<StoryAreaProps> = ({ stories }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  // প্রতি ক্লিকে ৩টা card করে স্ক্রল হবে
  const scrollAmount = 3 * 140; // ধরো ১টা কার্ড ১৪০px (তোমার কার্ডের width অনুযায়ী ঠিক করে নিতে পারো)

  // স্ক্রল অবস্থার ওপর ভিত্তি করে বাটন শো/হাইড করবে
  const updateButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const scrollLeftHandler = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRightHandler = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons);
    updateButtons(); // initial state
    return () => el.removeEventListener("scroll", updateButtons);
  }, []);

  if (!stories || stories.length === 0) return null;
  return (
    <div className="relative flex items-center">
      {/* Left Button */}
      {showLeft && (
        <div className="absolute hidden lg:block left-2 z-40 -mt-4">
          <button
            onClick={scrollLeftHandler}
            className="h-10 w-10 flex items-center justify-center bg-background rounded-full shadow-xl cursor-pointer"
          >
            <FaCaretLeft className="text-lg" />
          </button>
        </div>
      )}

      {/* Scrollable Area */}
      <div
        ref={scrollRef}
        className="flex w-full items-center gap-2 mb-2 sm:mb-4 bg-background rounded-lg py-3 sm:py-4 px-6 overflow-x-scroll scroll-smooth ScrollbarHide"
      >
        <StoryAdd />
        <StoryArea stories={stories} />
      </div>

      {/* Right Button */}
      {showRight && (
        <div className="absolute hidden lg:block right-2 z-40 -mt-4">
          <button
            onClick={scrollRightHandler}
            className="h-10 w-10 flex items-center justify-center bg-background rounded-full shadow-xl cursor-pointer"
          >
            <FaCaretRight className="text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Storyitems;
