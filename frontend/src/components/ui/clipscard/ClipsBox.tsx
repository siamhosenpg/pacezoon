import React from "react";

const ClipsBox = ({ src }) => {
  return (
    <section className="snap-center  flex items-center justify-center h-full px-4">
      {/* Reel inner box keeps exact 9:16 ratio visually centered */}
      <div className="relative flex items-center justify-center">
        {/* Video element: we make video height = 90vh so it sits nicely in screen.
                  Width is calculated to preserve 9/16 ratio: width = 90vh * 9/16.
                  Adjust as needed. */}
        <video
          src={src}
          playsInline
          muted
          loop
          autoPlay
          className="rounded-xl  bg-text max-h-[90vh] object-contain"
          style={{ width: "calc(90vh * 9 / 16)", height: "90vh" }}
        />

        {/* Overlay: right-side action buttons */}
        <div className="absolute right-2 bottom-8 flex flex-col gap-5 items-center z-20">
          <button className="flex flex-col items-center text-center">
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10">
              ❤️
            </span>
            <small className="text-xs opacity-80 mt-1">1.2k</small>
          </button>

          <button className="flex flex-col items-center text-center">
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10">
              💬
            </span>
            <small className="text-xs opacity-80 mt-1">123</small>
          </button>

          <button className="flex flex-col items-center text-center">
            <span className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10">
              ↗️
            </span>
            <small className="text-xs opacity-80 mt-1">Share</small>
          </button>
        </div>

        {/* Bottom-left caption area */}
        <div className="absolute left-4 bottom-6 max-w-[55%] z-20">
          <p className="text-sm leading-5 text-white">
            @username • A short caption for this reel — #tag
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClipsBox;
