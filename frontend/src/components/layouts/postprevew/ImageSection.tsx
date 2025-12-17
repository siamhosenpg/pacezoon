"use client";

import React, { useState } from "react";
import { FaBackspace } from "react-icons/fa";
import { VscScreenFull } from "react-icons/vsc";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ImageSectionProps {
  media: string[];
  index: number;
}

const ImageSection: React.FC<ImageSectionProps> = ({ media, index }) => {
  // Local state to control current image index
  const [current, setCurrent] = useState(index);

  const handelBack = (): void => {
    window.history.back();
  };

  const FullScreenImage = (): void => {
    const imgElement = document.querySelector(
      ".leftArea img"
    ) as HTMLElement | null;

    if (imgElement) {
      if (!document.fullscreenElement) {
        imgElement.requestFullscreen?.().catch((err: any) => {
          console.error(
            `Error enabling full-screen: ${err.message} (${err.name})`
          );
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  // ⬅️ Left button: Previous Image
  const prevImage = () => {
    if (media.length <= 1) return;

    setCurrent((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  // ➡️ Right button: Next Image
  const nextImage = () => {
    if (media.length <= 1) return;

    setCurrent((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="leftArea w-full md:w-8/12 h-[calc(100vh-110px)] relative flex items-center bg-background-tertiary border-border border-none lg:border rounded-none sm:rounded-lg overflow-hidden justify-center">
      {/* Top Buttons */}
      <div className="absolute z-30 left-0 top-0 flex items-center justify-center gap-3 p-3">
        <button
          onClick={handelBack}
          className="w-10 h-10 p-1 flex items-center justify-center bg-[#0000002d] rounded-full shadow-md"
        >
          <FaBackspace className="text-2xl text-white" />
        </button>

        <button
          onClick={FullScreenImage}
          className="w-10 h-10 p-1 flex items-center justify-center bg-[#0000002d] rounded-full shadow-md"
        >
          <VscScreenFull className="text-2xl text-white" />
        </button>
      </div>

      {/* Left Arrow */}
      {media.length > 1 && (
        <button
          onClick={prevImage}
          className="absolute left-3 z-30 w-10 h-10 flex items-center justify-center bg-[#00000040] rounded-full"
        >
          <FaChevronLeft className="text-xl text-white" />
        </button>
      )}

      {/* Right Arrow */}
      {media.length > 1 && (
        <button
          onClick={nextImage}
          className="absolute right-3 z-30 w-10 h-10 flex items-center justify-center bg-[#00000040] rounded-full"
        >
          <FaChevronRight className="text-xl text-white" />
        </button>
      )}

      {/* Main Image */}
      <img
        className="max-w-full max-h-full relative z-20 object-contain"
        src={media[current]}
        alt=""
        loading="lazy"
      />

      {/* Blurred Background Image */}
      <img
        className="absolute z[-10] max-w-full max-h-full object-contain blur-xl scale-200"
        src={media[current]}
        alt=""
        loading="lazy"
      />
    </div>
  );
};

export default ImageSection;
