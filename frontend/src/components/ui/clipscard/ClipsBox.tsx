import React from "react";

// Importing icons for action buttons
import { AiOutlineLike } from "react-icons/ai"; // Icon for like button
import { FaRegComments } from "react-icons/fa"; // Icon for comments (not used here)
import { RiShareForwardLine } from "react-icons/ri"; // Icon for share (not used here)
import { LuBookmark } from "react-icons/lu"; // Icon for bookmark
import { HiDotsHorizontal } from "react-icons/hi"; // Icon for more options
const ClipsBox = ({ src }) => {
  return (
    <section className="snap-center  flex items-center justify-center h-full px-0 md:px-4">
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
          className="rounded-xl  bg-black max-h-[90vh] object-contain  w-[calc(90vh_*_9_/_16)] h-[90vh]"
        />

        {/* Overlay: right-side action buttons */}
        <div className="absolute text-white md:text-black text-shadow-2xs   p-2 rounded-2xl right-1 md:right-[-120px] bottom-8 flex flex-col gap-1 items-center z-20">
          <button className="flex flex-col w-16 h-15 justify-center rounded-xl hover:bg-background-secondary items-center text-center ">
            <AiOutlineLike className="text-xl" />
            <small className="font-semibold text-sm opacity-80 mt-1">
              1822k
            </small>
          </button>

          <button className="flex flex-col w-18 h-16 justify-center rounded-xl hover:bg-background-secondary items-center text-center">
            <FaRegComments className="text-xl" />
            <small className="font-semibold text-sm opacity-80 mt-1">123</small>
          </button>

          <button className="flex flex-col w-18 h-16 justify-center rounded-xl hover:bg-background-secondary items-center text-center">
            <RiShareForwardLine className="text-xl" />
            <small className="font-semibold text-sm opacity-80 mt-1">
              Share
            </small>
          </button>
          <button className="flex flex-col w-18 h-16 justify-center rounded-xl hover:bg-background-secondary items-center text-center">
            <LuBookmark className="text-xl" />
            <small className="font-semibold text-sm opacity-80 mt-1">
              Save
            </small>
          </button>
          <button className="flex flex-col w-18 h-16 justify-center rounded-xl hover:bg-background-secondary items-center text-center">
            <HiDotsHorizontal className="text-xl" />
          </button>
        </div>

        {/* Bottom-left caption area */}
        <div className="absolute left-4 bottom-6 max-w-[85%] z-20">
          <div className="flex items-center gap-2 ">
            <img
              className=" block shrink-0 w-8 h-8 object-cover rounded-full bg-background-secondary overflow-hidden shadow-xl"
              src="/images/profile.jpg"
              alt=""
            />
            <span className="text-sm font-semibold text-white mr-2 text-shadow-md">
              Siam Hossen
            </span>
            <button className=" text-sm font-bold border-border border-[1px] text-white py-[2px] px-2 rounded-md">
              Follow
            </button>
          </div>
          <p className="text-sm leading-5 text-white line-clamp-2 mt-2 text-shadow-md">
            A short caption for this reel. The best football match for ever —
            #tag @mention
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClipsBox;
