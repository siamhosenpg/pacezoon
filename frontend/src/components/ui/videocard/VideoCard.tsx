import React from "react";

// Importing UserContext to access user data
import { BsThreeDotsVertical } from "react-icons/bs"; // Icon for menu options
import { MdOutlinePublic } from "react-icons/md"; // Icon for public visibility
import { TiEye } from "react-icons/ti"; // Icon for views
const VideoCard = () => {
  return (
    <li className="bg-background rounded-none sm:rounded-lg list-none  py-2 sm:py-2 pt-4 sm:pt-4  ">
      <div className="media relative z-0 block w-full px-0 sm:px-4 h-auto overflow-hidden">
        <img
          loading="lazy"
          className=" object-cover rounded-none sm:rounded-lg  w-full aspect-video min-w-[100px] bg-gray-100 "
          src="/images/thumb.jpg" // Media URL from post data
        />
        <div className=" bottom-4 right-6 absolute z-10 bg-gray-900 text-white rounded-md px-2 py-[2px] text-[12px] font-semibold  ">
          57:34
        </div>
      </div>

      <div className="posttext text-sm font-medium text-secondary mt-2 px-4 sm:px-4 line-clamp-2">
        This is a sample post description. It can be of any length and may
        include various details about the post.
      </div>
      <div className="flex items-center mt-2 px-4 sm:px-4 pb-3 justify-between ">
        <div className="left   flex items-center justify-start gap-2 overflow-hidden">
          <div className="w-9 h-9 bg-gray-300 sm:w-9 sm:h-9 border-border border shrink-0  rounded-full overflow-hidden ">
            <img
              loading="lazy"
              className=" block w-full  h-full object-cover   "
              src="/images/profile.jpg" // Placeholder profile image
              alt=""
            />
          </div>
          <div className="text ">
            <div className="flex gap-2  items-center">
              <div className="font-semibold block text-primary whitespace-nowrap overflow-hidden text-ellipsis">
                Siam Hossen
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-tertiary flex gap-1 items-center">
                <TiEye className="text-lg" />{" "}
                <span className="font-medium">38M</span>
                <span>Views</span>
                {/* Public visibility icon */}
              </span>
              <span className="text-[12px] text-tertiary flex gap-1 items-center">
                <MdOutlinePublic className="text-base" />
                <span>13 Days ago</span>
                {/* Public visibility icon */}
              </span>
            </div>
          </div>
        </div>
        <button>
          <BsThreeDotsVertical className="text-lg text-secondary" />
          {/* Menu button */}
        </button>
      </div>
    </li>
  );
};

export default VideoCard;
