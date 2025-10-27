import ClipsBox from "@/components/ui/clipscard/ClipsBox";
import React from "react";

// ReelsPage.jsx
// Single-file React component using Tailwind CSS.
// Usage: drop this component into a React app that has Tailwind configured.
// Replace the `videos` array URLs with your 9:16 vertical videos (or serve them from /public/videos/...)

export default function ReelsPage() {
  const videos = [
    "/videos/video.mp4",
    "/videos/video1.mp4",
    "/videos/video.mp4",
    "/videos/video1.mp4",
    "/videos/video.mp4",

    // add more paths or remote urls
  ];

  return (
    <div className=" ">
      {/* Scrollable reels container: snap scrolling so each reel centers */}
      <main
        className=" h-[calc(100vh_-_72px)] overflow-y-scroll snap-y snap-mandatory scroll-smooth "
        style={{ scrollSnapType: "y mandatory" }}
      >
        {videos.map((src, idx) => (
          <ClipsBox key={idx} src={src} />
        ))}

        {/* small spacer so last reel can center nicely above footer */}
        <div style={{ height: "14vh" }} />
      </main>

      {/* Optional small footer to avoid overlap with fixed header */}
      <footer className="fixed bottom-0 left-0 right-0 h-16 flex items-center justify-center z-30 pointer-events-none">
        <div className="w-full max-w-xl opacity-0">spacer</div>
      </footer>
    </div>
  );
}
