import React, { useEffect, useRef, useState } from "react";

import { RiShareForwardLine } from "react-icons/ri";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdOutlineLocationOn } from "react-icons/md";
import GlobalSoundToggle from "./GlobalSoundToggle";
import { PostTypes } from "@/types/postType";
import ClipsBoxSkeleton from "./ClipsBoxSkeleton";
import VideoCardFollow from "./buttons/VideoCardFollow";
import VideoLikeButton from "./buttons/VideoLikeButton";
import VideoCommentsButton from "./buttons/VideoCommentsButton";
import VideoSaveButton from "./buttons/VideoSaveButton";

interface ClipsBoxProps {
  post: PostTypes;
  isPortrait: boolean;
  isLoading: any;
}

const ClipsBox: React.FC<ClipsBoxProps> = ({ post, isPortrait, isLoading }) => {
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

  if (isLoading) return <ClipsBoxSkeleton />;
  return (
    <section className="snap-center flex items-center justify-center w-full h-full px-0 md:px-4">
      <div className="relative flex items-center justify-center w-full sm:w-fit ">
        <GlobalSoundToggle />
        {/* 🎬 Video */}
        {post.content.media.map((videourl, i) => {
          return (
            <video
              key={i}
              onClick={handleVideoToggle}
              ref={videoRef}
              src={videourl}
              loop
              playsInline
              preload="metadata"
              className={`bg-black border-none lg:border border-border   rounded-none lg:rounded-xl overflow-hidden   max-h-[90vh] w-full lg:w-[calc(90vh*9/16)] h-[calc(100vh-120px)] lg:h-[90vh] 
            ${bgClass}`}
            />
          );
        })}

        {/* 👉 Right Action Buttons */}
        <div className="absolute right-1 md:right-[-120px] bottom-2 lg:bottom-8 z-20 flex flex-col gap-1 text-white md:text-black">
          <VideoLikeButton postId={post._id} />
          <VideoCommentsButton postId={post._id} postNumber={post.postid} />

          <ActionButton icon={<RiShareForwardLine />} label="Share" />
          <VideoSaveButton postId={post._id} />

          <ActionButton icon={<HiDotsHorizontal />} />
        </div>

        {/* 📝 Caption */}
        <div className="absolute left-4 bottom-5 z-20 max-w-[80%]">
          <div className="flex items-center gap-2">
            <img
              src={post.userid.profileImage}
              className="w-8 h-8 rounded-full object-cover"
              alt=""
            />
            <span className="text-sm font-semibold text-white">
              {post.userid.name}
            </span>
            <VideoCardFollow targetUserId={post.userid._id} />
          </div>
          {post.content.location && (
            <span className="smalltext mt-1 text-white text-shadow-2xs flex items-center gap-0.5">
              <MdOutlineLocationOn className="text-lg" />
              {post.content.location}
            </span>
          )}

          <p className="mt-1 smalltext text-white text-shadow-2xs line-clamp-2">
            {post.content.caption}
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
