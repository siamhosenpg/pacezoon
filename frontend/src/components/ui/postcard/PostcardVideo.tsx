"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import GlobalSoundToggle from "../clipscard/GlobalSoundToggle";

// 👉 Type for image data
type VideoType = string;

type Props = {
  videodata: VideoType[];
};

const PostcardVideo: React.FC<Props> = ({ videodata }) => {
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
    <div className="relative w-full px-0 sm:px-6 ">
      <div className=" absolute mt-2 right-0 lg:right-8 z-20">
        <GlobalSoundToggle />
      </div>
      {videodata &&
        videodata.map((video, i) => {
          return (
            <Link
              key={i}
              href="/post"
              className="block w-full  h-auto overflow-hidden"
            >
              <video
                ref={videoRef}
                preload="metadata"
                playsInline
                loop
                className="rounded-none sm:rounded-lg overflow-hidden w-full h-auto min-h-[200px] bg-background-secondary max-h-[700px] border-border border-none lg:border"
                src={video}
              />
            </Link>
          );
        })}
    </div>
  );
};

export default PostcardVideo;
