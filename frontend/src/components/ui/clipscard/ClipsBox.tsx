import React, { useEffect, useRef, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { LuBookmark } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";
import GlobalSoundToggle from "./GlobalSoundToggle";

interface ClipsBoxProps {
  src: string;
  isPortrait: boolean;
}

const ClipsBox: React.FC<ClipsBoxProps> = ({ src, isPortrait }) => {
  const bgClass = isPortrait ? "object-cover" : "object-contain";
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // 🔊 global sound state
  const [isPaused, setIsPaused] = useState(false);

  /* 👁️ Intersection Observer */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );

    observer.observe(video);

    // 🔥 initial load fix
    const rect = video.getBoundingClientRect();
    if (
      rect.top < window.innerHeight * 0.6 &&
      rect.bottom > window.innerHeight * 0.4
    ) {
      setIsVisible(true);
    }

    return () => observer.disconnect();
  }, []);

  /* ▶️ Play / Pause + Sound */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, isMuted]);

  /* 🌍 Listen Global Sound Toggle */
  useEffect(() => {
    const handleSoundToggle = (e: Event) => {
      const muted = (e as CustomEvent<boolean>).detail;
      setIsMuted(muted);
    };

    window.addEventListener(
      "reels-sound-toggle",
      handleSoundToggle as EventListener
    );

    return () => {
      window.removeEventListener(
        "reels-sound-toggle",
        handleSoundToggle as EventListener
      );
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    if (isVisible && !isPaused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible, isMuted, isPaused]);
  const handleVideoToggle = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <section className="snap-center flex items-center justify-center w-full h-full px-0 md:px-4">
      <div className="relative flex items-center justify-center w-full sm:w-fit">
        <GlobalSoundToggle />
        {/* 🎬 Video */}
        <video
          onClick={handleVideoToggle}
          ref={videoRef}
          src={src}
          loop
          playsInline
          preload="metadata"
          className={`bg-black rounded-none lg:rounded-xl 
            max-h-[90vh] w-full 
            lg:w-[calc(90vh*9/16)] 
            h-[calc(100vh-120px)] 
            lg:h-[90vh] 
            ${bgClass}`}
        />

        {/* 👉 Right Action Buttons */}
        <div className="absolute right-1 md:right-[-120px] bottom-8 z-20 flex flex-col gap-1 text-white md:text-black">
          <ActionButton icon={<AiOutlineLike />} label="1822k" />
          <ActionButton icon={<FaRegComments />} label="123" />
          <ActionButton icon={<RiShareForwardLine />} label="Share" />
          <ActionButton icon={<LuBookmark />} label="Save" />
          <ActionButton icon={<HiDotsHorizontal />} />
        </div>

        {/* 📝 Caption */}
        <div className="absolute left-4 bottom-6 z-20 max-w-[80%]">
          <div className="flex items-center gap-2">
            <img
              src="/images/profile.jpg"
              className="w-8 h-8 rounded-full object-cover"
              alt=""
            />
            <span className="text-sm font-semibold text-white">
              Siam Hossen
            </span>
            <button className="text-xs font-bold border border-white text-white px-2 py-0.5 rounded">
              Follow
            </button>
          </div>

          <p className="mt-2 text-sm text-white line-clamp-2">
            A short caption for this reel — #tag @mention
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClipsBox;

/* 🔘 Action Button */
const ActionButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label?: string;
}) => (
  <button className="flex flex-col items-center justify-center cursor-pointer w-16 h-14 rounded-xl hover:bg-background-secondary">
    <span className="text-2xl font-black text-shadow-xs">{icon}</span>
    {label && (
      <small className="block smalltext opacity-80 mt-1 text-shadow-xs">
        {label}
      </small>
    )}
  </button>
);
