import React from "react";

const StoryCard = () => {
  return (
    <div>
      <div className="flex flex-col mx-w-[80px] w-[70px] sm:w-[80px]  items-center  shrink-0 ">
        <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-[#ff3007] via-[#fc6400] to-[#fac000] rounded-full overflow-hidden p-[3px]">
          <div className="  p-[3px] bg-background rounded-full  ">
            <img
              loading="lazy"
              className=" aspect-square w-full h-full block rounded-full bg-background-secondary  object-cover"
              src=""
              alt=""
            />
          </div>
        </div>
        <span className=" text-loose block text-[11px] sm:text-[12px]  w-full text-center mt-1 whitespace-nowrap overflow-hidden text-ellipsis ">
          Siam Hossen
        </span>
      </div>
    </div>
  );
};

export default StoryCard;
