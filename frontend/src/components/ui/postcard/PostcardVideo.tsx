"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// 👉 Type for image data
type VideoType = string;

type Props = {
  videodata: VideoType[];
};

const PostcardVideo: React.FC<Props> = ({ videodata }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.6 } // কমপক্ষে 60% দৃশ্যমান হলে "playing" ধরা হবে
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.muted = false;
      video.play().catch(() => {}); // autoplay error ignore
    } else {
      video.pause();
      video.currentTime = video.currentTime; // position remember করে
    }
  }, [isVisible]);

  return (
    <div className="relative w-full">
      {videodata &&
        videodata.map((video, i) => {
          return (
            <Link
              key={i}
              href="/post"
              className="block w-full px-0 sm:px-6 h-auto overflow-hidden"
            >
              <video
                ref={videoRef}
                preload="metadata"
                playsInline
                className="rounded-none sm:rounded-lg overflow-hidden mt-2 w-full h-auto min-h-[200px] bg-background-secondary max-h-[700px] border-border border"
                src={video}
              />
            </Link>
          );
        })}

      {/* Optional overlay for custom control (Play/Pause icon) */}
      <div className="absolute bottom-4 right-8 bg-black/50 text-white text-sm px-3 py-1 rounded-lg">
        {isVisible ? "🔊" : "🔇"}
      </div>
    </div>
  );
};

export default PostcardVideo;
